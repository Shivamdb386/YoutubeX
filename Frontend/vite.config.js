import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        server: command === 'serve' ? {
            proxy: {
                '/api': {
                    target: env.VITE_API_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            },
        } : undefined,
        plugins: [tailwindcss()],
        define: {
            'process.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL)
        }
    }
})
