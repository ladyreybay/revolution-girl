function SearchBar({search, setSearch, setFeedOpt}){
    return(
        <section className="flex flex-row items-center font-quan">
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value.toLowerCase())} name="postsSearch" id="posstSearch" placeholder="Enter what you wanna find"
                className="border-2 border-black rounded-xs w-4xl p-3 text-2xl bg-lightBack-400"
            />
            <select onChange={(e)=>setFeedOpt(e.target.value)} className="border-2 border-black text-2xl p-3 hover:bg-lightBack-400 hover:cursor-pointer w-xl font-quan">
                <option value="global" className="font-quan">Global Feed</option>
                <option value="local" className="font-quan">Friends&apos; Feed</option>
            </select>
        </section>
    );
}

export default SearchBar;