import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The broken pattern looks like:
    # 'process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'/categories/'
    # Or with double quotes:
    # "process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'/categories/"
    
    # We want to convert it to a template string:
    # `${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/categories/`
    
    # Pattern for single quotes
    content = re.sub(
        r"'process\.env\.VUE_APP_API_URL \|\| 'http://127\.0\.0\.1:8000/api/v1'(.*?)'",
        r"`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}\1`",
        content
    )
    
    # Pattern for double quotes
    content = re.sub(
        r'"process\.env\.VUE_APP_API_URL \|\| \'http://127\.0\.0\.1:8000/api/v1\'(.*?)"',
        r"`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}\1`",
        content
    )
    
    # Also fix the exact string without anything appended:
    # 'process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1''
    content = content.replace(
        "`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}`", 
        "(process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1')"
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

src_dir = 'src'
for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.vue') or file.endswith('.js'):
            fix_file(os.path.join(root, file))
print('Done fixing vue strings')
