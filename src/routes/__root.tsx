import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import '../styles.css';
export const Route=createRootRoute({head:()=>({meta:[{title:'Cricky — Cricket scoring'},{name:'description',content:'Protea-themed cricket scoring'}]}),component:()=> <html lang="en"><head><HeadContent/></head><body><Outlet/><Scripts/></body></html>});
