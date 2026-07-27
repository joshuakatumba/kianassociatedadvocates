import os
import glob
import re

services = [
    ("Banking and Finance.html", "Banking & Finance"),
    ("Coporate, Commercial and M&A.html", "Corporate, Commercial and M&A"),
    ("Dispute Resolution.html", "Dispute Resolution"),
    ("Employment And Labour.html", "Employment & Labour"),
    ("Immigration & NGOs.html", "Immigration & NGOs"),
    ("Intellectual Property.html", "Intellectual Property"),
    ("Oil & Gas And Infrastructure.html", "Oil & Gas, Energy & Infrastructure"),
    ("Tax.html", "Tax"),
    ("Technology, Media & Communication .html", "Technology, Media & Telecommunication (TMT)")
]

sectors = [
    "Aviation",
    "Construction",
    "Consumer Goods",
    "Education",
    "Energy",
    "Financial Institutions",
    "Hotels and Leisure",
    "Industrials",
    "Infrastructure",
    "Insurance",
    "Mining",
    "Pharmaceuticals and Healthcare",
    "Ports, Transport and Logistics",
    "TMT"
]

def get_mobile_nav_block(prefix):
    # Prefix will be "" or "../"
    
    html = ['<div class="mobile-nav-accordion__sublinks">']
    
    # SERVICES header
    html.append('    <span style="padding: 0.5rem 1.25rem; font-weight: 600; color: var(--brand-gold); font-size: 0.875rem; display: block; text-transform: uppercase;">Services</span>')
    for link, name in services:
        link_escaped = link.replace("&", "&amp;")
        name_escaped = name.replace("&", "&amp;")
        html.append(f'    <a href="{prefix}Services &amp; Sectors/{link_escaped}" class="mobile-nav-accordion__sublink">{name_escaped}</a>')
        
    # SECTORS header
    html.append('    <span style="padding: 0.5rem 1.25rem; font-weight: 600; color: var(--brand-gold); font-size: 0.875rem; display: block; text-transform: uppercase; margin-top: 0.5rem;">Sectors</span>')
    for sector in sectors:
        html.append(f'    <a href="{prefix}Sectors/{sector}.html" class="mobile-nav-accordion__sublink">{sector}</a>')
        
    html.append('</div>')
    return "\n                    ".join(html)

def update_file(filepath, prefix):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the mobile nav accordion for Services & Sectors
    # The block to replace is the <div class="mobile-nav-accordion__sublinks">...</div>
    # inside the Services & Sectors accordion panel.
    
    pattern = re.compile(
        r'(<button type="button" class="mobile-nav-accordion__trigger">\s*Services &amp; Sectors\s*<i data-lucide="chevron-down" class="mobile-nav-accordion__icon"></i>\s*</button>\s*<div class="mobile-nav-accordion__body">\s*)<div class="mobile-nav-accordion__sublinks">.*?</div>',
        re.DOTALL
    )
    
    if pattern.search(content):
        new_block = get_mobile_nav_block(prefix)
        new_content = pattern.sub(r'\1' + new_block, content)
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"Match not found in {filepath}")

# Update root files
root_htmls = glob.glob("*.html")
for f in root_htmls:
    update_file(f, "")

# Update subfolder files
sub_htmls = glob.glob("Sectors/*.html") + glob.glob("Services & Sectors/*.html")
for f in sub_htmls:
    update_file(f, "../")
