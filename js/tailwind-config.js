tailwind = {
    config: {
        theme: {
            extend: {
                colors: {
                    brand: {
                        // Using HSL (Hue, Saturation, Lightness) for easier color tweaking
                        bg: 'hsl(45, 29%, 97%)',      // Crisp Off-White
                        navy: 'hsl(216, 70%, 22%)',   // Deep Royal Navy
                        gold: 'hsl(43, 64%, 52%)',    // Classic Metallic Gold
                        gray: 'hsl(220, 9%, 46%)',    // Text Gray
                        light: 'hsl(0, 0%, 100%)',    // Pure White
                        dark: 'hsl(222, 47%, 11%)'    // Deep Slate
                    }
                },
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    serif: ['Playfair Display', 'serif'],
                }
            }
        }
    }
}
