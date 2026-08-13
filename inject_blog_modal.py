import re
import os

files = ['News.html', 'Publications.html', 'Legal Updates.html']

lorem_text = """
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
"""

for filepath in files:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # We want to find the end of <div class="split-card__meta">...</div>
    # and insert the Read More button and hidden content right after it (inside split-card__content)
    
    # Find all split-card__content divs
    # This regex is a bit fragile for HTML, but we know the exact structure of our cards.
    # Structure:
    # </div> (end of meta)
    # </div> (end of split-card__content)
    
    # Let's use a simpler approach. Replace the closing div of split-card__content with our button + hidden content + closing div.
    
    def replace_card(match):
        meta_html = match.group(0)
        
        button_and_content = f"""
                            <button class="split-card__read-more">Read More</button>
                            <div class="split-card__full-content" style="display: none;">
                                {lorem_text}
                            </div>
                        </div>"""
        
        return meta_html.replace('</div>\n                        </div>', '</div>\n' + button_and_content)

    # Let's just use string replacement on a specific pattern we know exists:
    # </div> (meta)
    # </div> (content)
    # <div class="split-card__image-wrap">
    
    # Actually, a regex might be better:
    # `(<div class="split-card__meta">.*?</div>)\s*</div>\s*<div class="split-card__image-wrap">`
    
    pattern = re.compile(r'(<div class="split-card__meta">.*?</div>)(\s*)</div>', re.DOTALL)
    
    new_content = pattern.sub(r'\1\2    <button class="split-card__read-more">Read More</button>\n\2    <div class="split-card__full-content" style="display: none;">' + lorem_text + r'\2    </div>\n\2</div>', content)
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    print(f"Updated {filepath}")

