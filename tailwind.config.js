/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'dp-bg': '#081021',
                'dp-brand': '#00D8FF',
                'dp-cyan': '#00E4C8',
                'dp-purple': '#7B61FF',
                'dp-warn': '#FF5D73',
                'dp-text': '#FFFFFF',
                'dp-sub': '#B0C4DE'
            },
            fontFamily: {
                sans: ['PingFang SC', 'Microsoft YaHei', 'sans-serif']
            }
        }
    },
    plugins: []
}
