"use client";
import { useMemo, useState } from "react";
import MapPanel from "./MapPanel";

export type Spot={id:number;name:string;category:string;lat:number;lng:number;area:string;rating:number;reviews:number;price:string;open:string;tags:string[];sponsored?:boolean};
export const categories=["すべて","イベント","駐車場・EV","子育て","ペット","ゲーム","道の駅・温泉","コワーキング","聖地巡礼","防災","無人販売"];
export const spots:Spot[]=[
 {id:1,name:"TOKYO PIXEL ARENA",category:"ゲーム",lat:35.6995,lng:139.7711,area:"秋葉原",rating:4.8,reviews:126,price:"¥800〜",open:"本日 22:00まで",tags:["初心者大会","駅近"],sponsored:true},
 {id:2,name:"丸の内EVステーション",category:"駐車場・EV",lat:35.6818,lng:139.7647,area:"東京駅",rating:4.5,reviews:89,price:"30分 ¥300",open:"空き 6台",tags:["急速充電","予約可"]},
 {id:3,name:"こども未来パーク",category:"子育て",lat:35.7138,lng:139.7745,area:"上野",rating:4.7,reviews:214,price:"無料",open:"17:00まで",tags:["雨天OK","授乳室"]},
 {id:4,name:"WAN TERRACE",category:"ペット",lat:35.6654,lng:139.7312,area:"六本木",rating:4.6,reviews:74,price:"¥1,200〜",open:"席あり",tags:["大型犬OK","テラス"]},
 {id:5,name:"週末クラフトマーケット",category:"イベント",lat:35.6698,lng:139.7037,area:"原宿",rating:4.4,reviews:55,price:"入場無料",open:"7/27開催",tags:["当日参加","屋外"]},
 {id:6,name:"湯めぐり休憩処",category:"道の駅・温泉",lat:35.6586,lng:139.7454,area:"芝公園",rating:4.5,reviews:193,price:"¥980",open:"23:00まで",tags:["露天風呂","食事"]},
 {id:7,name:"FOCUS HUB 渋谷",category:"コワーキング",lat:35.6595,lng:139.7005,area:"渋谷",rating:4.6,reviews:108,price:"1時間 ¥550",open:"12席空き",tags:["個室","高速Wi-Fi"]},
 {id:8,name:"映画『青い東京』ロケ地",category:"聖地巡礼",lat:35.6896,lng:139.6921,area:"新宿",rating:4.7,reviews:341,price:"無料",open:"24時間",tags:["公式認定","撮影可"]},
 {id:9,name:"区民防災センター",category:"防災",lat:35.6909,lng:139.7731,area:"日本橋",rating:4.9,reviews:32,price:"無料",open:"給水・AED",tags:["避難所","多言語"]},
 {id:10,name:"FARM BOX 24",category:"無人販売",lat:35.6467,lng:139.7101,area:"恵比寿",rating:4.3,reviews:61,price:"野菜 ¥150〜",open:"24時間",tags:["電子決済","朝採れ"]},
];

export default function Home(){
 const [category,setCategory]=useState("すべて"); const [query,setQuery]=useState(""); const [selected,setSelected]=useState(1); const [saved,setSaved]=useState<number[]>([]); const [mapMode,setMapMode]=useState(true);
 const filtered=useMemo(()=>spots.filter(s=>(category==="すべて"||s.category===category)&&`${s.name}${s.area}${s.tags.join("")}`.toLowerCase().includes(query.toLowerCase())),[category,query]);
 const active=spots.find(s=>s.id===selected)??filtered[0];
 return <main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"WebSite",name:"SPOTPALETTE",url:"https://spotpalette.jp/",description:"近くの場所・イベント・サービスを地図と口コミで比較できる地域ポータル"})}}/>
 <header><a className="logo" href="#top"><b>S</b>SPOTPALETTE<span>近くのいい場所、すぐ見つかる。</span></a><nav><a href="#discover">探す</a><a href="#business">掲載する</a><a href="/app">アプリ</a><a href="#about">運営方針</a></nav><button className="post">＋ スポットを投稿</button></header>
 <section className="hero" id="top"><div><p className="eyebrow">LOCAL DISCOVERY PLATFORM</p><h1>今日、近くで<br/><em>いい場所。</em></h1><p>イベント、駐車場、子育て、ペット、ゲームまで。地図と地域の声から、いま行ける場所を見つけよう。</p></div><div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="場所・目的・駅名で検索"/><button onClick={()=>document.querySelector("#discover")?.scrollIntoView()}>地図で探す</button></div></section>
 <section className="category-strip" aria-label="ジャンル">{categories.map((c,i)=><button className={category===c?"active":""} key={c} onClick={()=>setCategory(c)}><span>{["⌘","●","⚡","☀","♣","◆","♨","▦","★","＋","▣"][i]}</span>{c}</button>)}</section>
 <section className="explorer" id="discover"><div className={`results ${mapMode?"":"full"}`}><div className="results-head"><div><p className="eyebrow">NEAR TOKYO</p><h2>東京周辺のおすすめ</h2><small>{filtered.length}件・2026年7月22日更新</small></div><select aria-label="並び順"><option>おすすめ順</option><option>評価順</option><option>距離順</option></select></div><div className="mobile-switch"><button className={!mapMode?"active":""} onClick={()=>setMapMode(false)}>一覧</button><button className={mapMode?"active":""} onClick={()=>setMapMode(true)}>地図</button></div><div className="cards">{filtered.map(s=><article key={s.id} className={selected===s.id?"selected":""} onClick={()=>setSelected(s.id)}><div className="thumb"><span>{s.category.slice(0,1)}</span>{s.sponsored&&<small>PR</small>}</div><div className="card-body"><div className="meta">{s.category} ・ {s.area}</div><h3>{s.name}</h3><p className="stars">★ {s.rating} <span>({s.reviews}件)</span></p><div className="tags">{s.tags.map(t=><i key={t}>{t}</i>)}</div><p className="status"><b>{s.open}</b><span>{s.price}</span></p></div><button className="save" aria-label="保存" onClick={e=>{e.stopPropagation();setSaved(v=>v.includes(s.id)?v.filter(x=>x!==s.id):[...v,s.id])}}>{saved.includes(s.id)?"♥":"♡"}</button></article>)}</div></div><div className={`map-wrap ${mapMode?"show":""}`}><MapPanel spots={filtered} selected={selected} onSelect={setSelected}/>{active&&<aside className="map-card"><small>{active.category}・{active.area}</small><b>{active.name}</b><span>★ {active.rating}　{active.open}</span><button>詳細・予約を見る</button></aside>}</div></section>
 <section className="answer"><p className="eyebrow">QUICK ANSWER</p><h2>東京駅から30分以内で、今日利用できるおすすめスポット</h2><p>現在10件を掲載しています。評価4.5以上は8件、無料で利用できる場所は3件、予約対応は4件です。料金・営業時間・空き状況は各施設の公式情報と利用者投稿をもとに更新しています。</p><div><a href="#discover">地図で比較する →</a><span>情報確認日：2026年7月22日</span></div></section>
 <section className="revenue" id="business"><div><p className="eyebrow">FOR LOCAL BUSINESS</p><h2>見つけてもらうを、<br/>予約につなげる。</h2><p>店舗・施設・イベント主催者向けに、公式認証、空き状況更新、予約リンク、閲覧分析を提供します。</p></div><div className="plans"><article><small>FREE</small><h3>基本掲載</h3><b>¥0</b><p>基本情報、写真、営業時間、口コミ返信</p><button>無料で登録</button></article><article className="pro"><small>PRO</small><h3>集客プラン</h3><b>月額 ¥4,980〜</b><p>上位表示ではなく、予約導線・分析・リアルタイム情報を強化</p><button>掲載相談をする</button></article></div></section>
 <section className="seo" id="about"><p className="eyebrow">TRUST & COMMUNITY</p><h2>地域の情報を、正確に、透明に。</h2><div>{[["01","公式情報を優先","営業時間や料金は施設・主催者の公式情報を確認します。"],["02","広告と順位を分離","PR掲載は明示し、通常ランキングへ広告費を加点しません。"],["03","口コミを審査","権利侵害、個人情報、スパムを公開前に確認します。"]].map(x=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section>
 <footer><div className="logo"><b>S</b>SPOTPALETTE</div><p>場所選びを、もっと早く、もっと確かに。</p><nav><a href="#discover">スポット検索</a><a href="#business">事業者向け</a><a href="/app">アプリ</a><a href="#about">編集方針</a></nav><small>© 2026 SPOTPALETTE. Map data © OpenStreetMap contributors.</small></footer></main>;
}
