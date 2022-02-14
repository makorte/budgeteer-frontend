const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./src/**/*.tsx",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans]
            },
            width: {
                '112': '28rem'
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
}
