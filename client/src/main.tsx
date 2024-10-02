import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  RouterProvider } from "react-router-dom";
import "./index.css"

import router from './router.jsx'
import './index.css'

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)