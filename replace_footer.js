const fs = require('fs');

const files = [
    'Index.html',
    'About Us.html',
    'Contact Us.html',
    'Services Detail.html',
    'Documentation.html'
];

const newFooter = `    <!-- Footer Banner mimicking the screenshot bottom -->
    <section class="py-16 px-4 w-full border-t border-gray-100 bg-brand-bg relative mt-auto">
        <div class="absolute inset-0 z-0 opacity-5 pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%231d2736\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
        <div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 text-brand-navy">
            
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <i data-lucide="map-pin" class="w-5 h-5"></i>
                </div>
                <div class="text-sm">
                    <p>4th Floor DFCU Towers</p>
                    <p>26 Kyadondo Road, Nakasero</p>
                    <p>Kampala Uganda</p>
                </div>
            </div>

            <div class="flex flex-col items-center">
                <div class="flex items-center justify-center mb-6 gap-2">
                    <i data-lucide="scale" class="text-brand-navy w-10 h-10"></i>
                    <span class="font-serif font-bold text-2xl tracking-wide">Kian<span class="font-sans font-normal text-xs block -mt-1 text-gray-500 tracking-wider">ASSOCIATED<br>ADVOCATES</span></span>
                </div>
                <div class="flex gap-4">
                    <a href="#" class="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center hover:bg-brand-gold transition-colors">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center hover:bg-brand-gold transition-colors">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center hover:bg-brand-gold transition-colors">
                        <i data-lucide="phone" class="w-4 h-4"></i>
                    </a>
                </div>
                <p class="text-xs text-gray-400 mt-6 text-center">Copyright &copy; 2024, Kian Associated Advocates. All Rights Reserved.</p>
            </div>

            <div class="flex flex-col gap-4">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-brand-gold text-white flex items-center justify-center">
                        <i data-lucide="phone" class="w-4 h-4"></i>
                    </div>
                    <div class="text-sm">
                        <p>+256 414 254 540</p>
                        <p>+256 312 179 750</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-brand-gold text-white flex items-center justify-center">
                        <i data-lucide="mail" class="w-4 h-4"></i>
                    </div>
                    <div class="text-sm">
                        <p>info@kianadvocates.com</p>
                    </div>
                </div>
            </div>

        </div>
    </section>`;

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    const footerRegex = /<footer[\s\S]*?<\/footer>/;
    if (footerRegex.test(content)) {
        content = content.replace(footerRegex, newFooter);
        fs.writeFileSync(file, content);
        console.log(`Replaced footer in ${file}`);
    } else {
        console.log(`No footer found in ${file}`);
    }
}
