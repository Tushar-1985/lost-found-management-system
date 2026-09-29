import{useEffect,useMemo,useState}from"react";
const API="http://localhost:5000/api";
const initial={type:"Lost",itemName:"",category:"Electronics",description:"",location:"",date:"",contactName:"",contact:""};
function App(){
 const[form,setForm]=useState(initial),[items,setItems]=useState([]),[query,setQuery]=useState(""),[filter,setFilter]=useState("All"),[message,setMessage]=useState(""),[loading,setLoading]=useState(false);
 const load=async(q="")=>{const r=await fetch(q?`${API}/items/search?q=${encodeURIComponent(q)}`:`${API}/items`);if(!r.ok)throw Error("Could not load items.");setItems(await r.json())};
 useEffect(()=>{load().catch(()=>setMessage("Could not connect to backend."))},[]);
 const shown=useMemo(()=>filter==="All"?items:items.filter(x=>x.type===filter),[items,filter]);
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const submit=async e=>{e.preventDefault();setLoading(true);setMessage("");try{const r=await fetch(`${API}/items`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)}),d=await r.json();if(!r.ok)throw Error(d.message);setMessage(`${form.type} item reported successfully.`);setForm({...initial,type:form.type});setQuery("");await load()}catch(e){setMessage(e.message)}finally{setLoading(false)}};
 const search=async e=>{e.preventDefault();try{await load(query)}catch(e){setMessage(e.message)}};
 return <div className="app">
  <header><div className="hero"><div><small>CAMPUS SERVICE</small><h1>FindBack</h1><p>Lost & Found Management System</p></div><div className="hero-mark">↗</div></div></header>
  <main>
   <section className="top">
    <div className="card"><div className="title"><div><small>REPORT AN ITEM</small><h2>What happened?</h2></div><div className="switch"><button className={form.type==="Lost"?"on lost":""} onClick={()=>setForm({...form,type:"Lost"})}>Lost</button><button className={form.type==="Found"?"on found":""} onClick={()=>setForm({...form,type:"Found"})}>Found</button></div></div>
     <form onSubmit={submit}>
      <div className="two"><label>Item Name<input name="itemName" value={form.itemName} onChange={change} placeholder="e.g. Black wallet" required/></label><label>Category<select name="category" value={form.category} onChange={change}><option>Electronics</option><option>Documents</option><option>Accessories</option><option>Books</option><option>Keys</option><option>Clothing</option><option>Other</option></select></label></div>
      <label>Description<textarea name="description" value={form.description} onChange={change} placeholder="Color, brand, identifying details..." rows="3" required/></label>
      <div className="two"><label>Location<input name="location" value={form.location} onChange={change} placeholder="e.g. Library" required/></label><label>Date<input type="date" name="date" value={form.date} onChange={change} required/></label></div>
      <div className="two"><label>Your Name<input name="contactName" value={form.contactName} onChange={change} placeholder="Contact person" required/></label><label>Contact<input name="contact" value={form.contact} onChange={change} placeholder="Phone or email" required/></label></div>
      <button className={`submit ${form.type.toLowerCase()}`} disabled={loading}>{loading?"Submitting...":`Report Item as ${form.type} →`}</button>
     </form>{message&&<div className="message">{message}</div>}
    </div>
    <aside className="card info"><small>HOW IT WORKS</small><div><b>01 · Report</b><p>Submit clear details about a lost or found item.</p></div><div><b>02 · Search</b><p>Search by name, category, location or description.</p></div><div><b>03 · Connect</b><p>Use displayed contact details to coordinate.</p></div></aside>
   </section>
   <section className="card"><div className="title"><div><small>ITEM DIRECTORY</small><h2>Search matching items</h2></div><span className="count">{shown.length} result{shown.length!==1?"s":""}</span></div>
    <form className="search" onSubmit={search}><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search item name, category, location or description..."/><button>Search</button></form>
    <div className="filters">{["All","Lost","Found"].map(x=><button key={x} className={filter===x?"selected":""} onClick={()=>setFilter(x)}>{x}</button>)}</div>
    {!shown.length?<div className="empty"><div>⌕</div><h3>No matching items</h3><p>Try another search or report a new item above.</p></div>:
    <div className="items">{shown.map(x=><article className="item" key={x._id}><div className="itemtop"><span className={`badge ${x.type.toLowerCase()}`}>{x.type}</span><span>{x.category}</span></div><h3>{x.itemName}</h3><p>{x.description}</p><div className="meta">⌖ {x.location}<br/>◷ {x.date}</div><div className="contact"><i>{x.contactName[0]?.toUpperCase()}</i><div><b>{x.contactName}</b><span>{x.contact}</span></div></div></article>)}</div>}
   </section>
  </main><footer>FindBack · Lost & Found Management System</footer>
 </div>
}
export default App;