import os
import re

base_dir = "."

# 1. Create Legal Updates.html
with open("About Us.html", "r") as f:
    content = f.read()

# Replace title
content = content.replace("<title>About Us | Kian Associated Advocates</title>", "<title>Legal Updates | Kian Associated Advocates</title>")

# Fix nav active state
content = content.replace('<a href="About Us.html" class="site-nav-link active">Our Firm</a>', '<a href="About Us.html" class="site-nav-link">Our Firm</a>')
content = content.replace('<a href="#" class="site-nav-dropdown__item">Legal Updates</a>', '<a href="Legal Updates.html" class="site-nav-dropdown__item active">Legal Updates</a>')
content = content.replace('<a href="Legal Updates.html" class="site-nav-dropdown__item">Legal Updates</a>', '<a href="Legal Updates.html" class="site-nav-dropdown__item active">Legal Updates</a>')
# Ensure "Insights" trigger is active
content = content.replace('<a href="#" class="site-nav-dropdown__trigger">\n                        Insights', '<a href="#" class="site-nav-dropdown__trigger active">\n                        Insights')

# Update hero/headings in Legal Updates
content = content.replace("Helping To<br>Overcome And<br>Ease The Legal<br>Burden", "Staying Ahead<br>Of The<br>Curve With<br>Legal Updates")
content = content.replace("Welcome Message", "Latest Updates")

with open("Legal Updates.html", "w") as f:
    f.write(content)

# 2. Update all HTML files
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            with open(file_path, "r") as f:
                html = f.read()
            
            # Determine prefix
            depth = file_path.count(os.sep) - 1
            prefix = "../" * depth if depth > 0 else ""

            # Fix News
            html = re.sub(r'<a href="#" class="site-nav-dropdown__item">News</a>', f'<a href="{prefix}News.html" class="site-nav-dropdown__item">News</a>', html)
            html = re.sub(r'<a href="#" class="mobile-nav-accordion__sublink">News</a>', f'<a href="{prefix}News.html" class="mobile-nav-accordion__sublink">News</a>', html)
            
            # Fix Legal Updates (if it is #)
            html = re.sub(r'<a href="#" class="site-nav-dropdown__item">Legal Updates</a>', f'<a href="{prefix}Legal Updates.html" class="site-nav-dropdown__item">Legal Updates</a>', html)
            html = re.sub(r'<a href="#" class="mobile-nav-accordion__sublink">Legal Updates</a>', f'<a href="{prefix}Legal Updates.html" class="mobile-nav-accordion__sublink">Legal Updates</a>', html)

            with open(file_path, "w") as f:
                f.write(html)

print("Updates completed successfully.")
