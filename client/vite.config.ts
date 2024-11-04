import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       input: 'src/main.js',
//     },
//   },
//   optimizeDeps: {
//     include: ['react', 'react-dom'], // Inclure manuellement les dépendances si nécessaire
//   },
//   server: {
//     host: '0.0.0.0', // Permet à Vite d'écouter sur toutes les interfaces
//     port: 5173,
//     watch: {
//       usePolling: true,
//     }, // Le port que vous exposez dans Docker
//   },
// })

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173, // inner port for Vite
    watch: {
      usePolling: true // Enable polling for file changes inside Docker
    },
    // hmr: {
    //   host: 'localhost',
    //   clientPort: 5173 // outer port for HMR
    // }
  },

  plugins: [react()],
})
