function SearchBar({search, setSearch, setFeedOpt}){
    return(
        <section className="flex flex-row items-center">
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value.toLowerCase())} name="postsSearch" id="posstSearch" placeholder="Enter what you wanna find"
                className="border-2 border-black rounded-xs w-4xl p-3 text-2xl"
            />
            <select onChange={(e)=>setFeedOpt(e.target.value)} className="border-2 border-black text-2xl p-3 hover:bg-fuchsia-100 hover:cursor-pointer w-xl">
                <option value="global">Global Feed</option>
                <option value="local">Friends&apos; Feed</option>
            </select>
        </section>
    );
}

export default SearchBar;