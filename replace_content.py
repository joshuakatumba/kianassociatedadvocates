import os
import re
from bs4 import BeautifulSoup

content_map = {
    'Kian Associated Advocates Wins "Law Firm of the Year" Award': '<p>We are profoundly honored to announce that Kian Associated Advocates has been recognized as the "Law Firm of the Year" at the prestigious East African Legal Excellence Awards 2024. This accolade is a testament to our unwavering commitment to providing unparalleled legal services and achieving outstanding results for our clients across the region.</p><p>Over the past year, our dedicated team has successfully navigated complex multi-jurisdictional transactions, secured landmark rulings in dispute resolution, and advised on critical infrastructure projects. We extend our deepest gratitude to our clients for their continued trust and to our exceptional staff whose hard work and expertise made this achievement possible. As we celebrate this milestone, we remain steadfast in our mission to set the highest standards of legal practice.</p>',
    'Kian Associated Advocates Announces New Partner Promotion': '<p>We are delighted to announce the promotion of three senior associates to the partnership, effective January 2025. This strategic expansion of our leadership team reflects the firm\'s robust growth and our commitment to nurturing top-tier legal talent from within our ranks. The newly promoted partners will strengthen our capabilities in Corporate M&A, Intellectual Property, and Banking & Finance.</p><p>Each of our new partners has consistently demonstrated exceptional legal acumen, deep industry knowledge, and an unwavering dedication to client service. Their elevation is well-deserved, and we are confident they will play pivotal roles in shaping the future of Kian Associated Advocates and continuing to deliver innovative legal solutions in an ever-evolving market.</p>',
    'Firm Recognized in Legal 500 Directory for Corporate M&A': '<p>Kian Associated Advocates is proud to be ranked as a Tier 1 firm in the latest edition of the Legal 500 Directory for Corporate and M&A. This prestigious recognition highlights our position as a leading advisor on high-value corporate transactions, joint ventures, and strategic investments within the East African market.</p><p>The Legal 500 editorial noted our team\'s "exceptional commercial awareness and ability to handle complex cross-border mandates with precision." We are incredibly grateful to our clients who provided outstanding feedback during the research process. This ranking reinforces our reputation as the go-to firm for domestic and international corporations seeking strategic legal guidance.</p>',
    'Hosting the Annual East African Legal Summit on Cross-Border Trade': '<p>Next month, Kian Associated Advocates will proudly host the Annual East African Legal Summit, bringing together industry leaders, policymakers, and legal experts to discuss the future of cross-border trade. As the region moves toward deeper economic integration, understanding the evolving regulatory landscape is crucial for businesses looking to expand their footprint.</p><p>The summit will feature keynote addresses, panel discussions, and interactive workshops covering topics such as harmonizing trade laws, resolving cross-border disputes, and leveraging the African Continental Free Trade Area (AfCFTA). We invite our clients and peers to join us for what promises to be an insightful and highly engaging event.</p>',
    
    'The Impact of New Tax Regulations on Cross-Border M&A': '<p>The landscape of cross-border Mergers and Acquisitions is undergoing a significant shift following the introduction of the new regional tax regulations. These policy changes, aimed at harmonizing corporate taxation across East Africa, introduce complex compliance requirements for multinational entities engaging in restructuring or consolidation.</p><p>Our latest whitepaper provides a comprehensive analysis of the revised tax codes. We explore the implications for holding structures, the treatment of capital gains, and the newly introduced digital services tax provisions. Dealmakers must proactively assess these regulatory changes during the due diligence phase to mitigate unforeseen liabilities and structure transactions efficiently.</p>',
    'Navigating Dispute Resolution in the Energy Sector': '<p>The energy sector is inherently complex, characterized by massive capital investments, long-term contracts, and intricate regulatory frameworks. Consequently, disputes in this industry are often high-stakes and multifaceted, involving states, state-owned entities, and private investors. Effective dispute resolution mechanisms are therefore critical to maintaining project viability and investor confidence.</p><p>This article examines the most common causes of conflict in the energy sector, including supply disruptions, pricing renegotiations, and environmental compliance issues. We also provide a comparative analysis of arbitration versus litigation, emphasizing the growing preference for specialized international arbitration centers to ensure neutral and enforceable outcomes.</p>',
    'Modern Employment Law: Remote Work Compliance': '<p>The transition to remote and hybrid work models has permanently altered the employer-employee dynamic, necessitating a re-evaluation of traditional employment law frameworks. Organizations must now navigate a complex web of regulations concerning occupational health and safety, data security, and employee monitoring in a decentralized environment.</p><p>In this publication, our Employment & Labour team outlines the essential legal considerations for drafting comprehensive remote work policies. We address the jurisdictional challenges of employing remote workers across state lines, the employer\'s liability for workplace injuries sustained at home, and the delicate balance between productivity tracking and employee privacy rights.</p>',
    'Intellectual Property Protection in the AI Era': '<p>The rapid advancement of Artificial Intelligence technologies presents unprecedented challenges and opportunities for Intellectual Property (IP) law. As AI systems become capable of generating original content, code, and inventions, critical questions arise regarding authorship, ownership, and the boundaries of fair use.</p><p>This briefing explores the current legal debate surrounding AI-generated works and the protection of proprietary algorithms. We offer practical guidance for tech companies and creators on safeguarding their IP portfolios, managing the risks associated with utilizing open-source AI models, and navigating the evolving regulatory landscape in various jurisdictions.</p>',
    
    'New Tax Implications for Cross-Border M&A': '<p>A recent amendment to the national tax code has introduced new compliance obligations for companies engaging in cross-border Mergers and Acquisitions. Effective immediately, the revenue authority will require enhanced disclosure of beneficial ownership and transfer pricing documentation for all transactions exceeding the newly established monetary thresholds.</p><p>This legal update summarizes the key provisions of the amendment and advises corporate clients on the necessary steps to ensure compliance. Failure to adhere to these new reporting standards may result in significant penalties and delays in transaction approvals. We strongly recommend consulting with our tax advisory team prior to finalizing any cross-border restructuring plans.</p>',
    'Supreme Court Ruling on Remote Work Compliance': '<p>In a landmark decision, the Supreme Court has clarified the scope of employer liability concerning remote workers. The ruling establishes that employers bear a duty of care to ensure safe working conditions, even when employees are operating from their private residences. This decision has profound implications for occupational health and safety policies nationwide.</p><p>The Court emphasized that organizations must implement reasonable measures to assess and mitigate ergonomic and psychological risks associated with remote work. Employers are advised to immediately review and update their telecommuting agreements and health and safety protocols to align with this new legal precedent.</p>',
    'Updated Regulations for Consumer Data Protection': '<p>The Data Protection Authority has issued updated guidelines aimed at strengthening consumer privacy rights in the digital economy. The revised regulations mandate stricter consent mechanisms for data collection, enhanced requirements for reporting data breaches, and the mandatory appointment of a Data Protection Officer for organizations processing significant volumes of sensitive information.</p><p>Businesses have a six-month grace period to align their data processing practices with the new guidelines. Our data privacy specialists are available to conduct comprehensive audits of your current compliance frameworks and assist in implementing the necessary technical and organizational measures to meet these stringent new standards.</p>'
}

files = ['News.html', 'Publications.html', 'Legal Updates.html']
for filepath in files:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    updated = False
    
    for card in soup.find_all('article', class_='split-card'):
        title_el = card.find(class_='split-card__title')
        if not title_el:
            continue
            
        title = title_el.get_text(strip=True)
        # Handle the one title that breaks across lines
        title = re.sub(r'\s+', ' ', title).strip()
        
        full_content_el = card.find(class_='split-card__full-content')
        if not full_content_el:
            continue
            
        if title in content_map:
            # Replace the contents of the tag
            full_content_el.clear()
            new_content = BeautifulSoup(content_map[title], 'html.parser')
            full_content_el.append(new_content)
            updated = True
        else:
            print(f"Warning: Title not found in map: '{title}'")
            
    if updated:
        with open(filepath, 'w') as f:
            f.write(str(soup))
        print(f"Updated {filepath}")

