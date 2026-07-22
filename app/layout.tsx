import type { Metadata } from "next";import "leaflet/dist/leaflet.css";import "./globals.css";
export const metadata:Metadata={title:"MAPPIN｜近くの場所・イベントを地図で比較",description:"イベント、駐車場、子育て、ペット、ゲームなど、近くの施設を地図・料金・口コミから比較できる地域ポータル。",keywords:["近くの施設","地図検索","イベント","駐車場","子育てスポット","ペット同伴"],openGraph:{title:"MAPPIN",description:"近くのいい場所、すぐ見つかる。",type:"website",locale:"ja_JP"},robots:{index:true,follow:true},icons:{icon:"/favicon.svg"}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ja"><body>{children}</body></html>}
