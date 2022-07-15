import React, { useEffect, useState } from "react";

function App() {
    const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);

    useEffect(() => {
        updateTabs();
    }, [])

    const updateTabs = async () => {
        let tabs_res = await chrome.tabs.query({});
        setTabs(tabs_res);
    }

    const closeTab = async (id: number) => {
        await chrome.tabs.remove(id);
        await updateTabs();
    }

    const closeAll = async () => {
        let tab = await chrome.tabs.create({});
        let remove = [];
        for(let t of await chrome.tabs.query({})){
            if(t.id !== tab.id)
                remove.push(chrome.tabs.remove(t.id));
        }

        try{
            await Promise.all(remove);
        }catch(e){
            console.error(e);
        }

        await updateTabs();
    }
    return (
        <div className="w-full h-full bg-gray-700 p-3">
            <div className="w-full p-2 h-full border border-gray-400 overflow-auto">
                <h1 className="mb-1 text-base font-bold text-center text-white">Chrome extension starter</h1>
                <ul className="list-disc block ml-4 text-white">
                    <li>Typescript</li>
                    <li>React</li>
                    <li>Tailwind</li>
                    <li>Rollup</li>
                </ul>
                <div className="w-full">
                    <table className="w-full table-fixed text-white my-2">
                        <tr>
                            <th className="w-[10%]">ID</th>
                            <th className="w-[30%]">Title</th>
                            <th className="w-[50%]">URL</th>
                            <th></th>
                        </tr>
                        <tbody>
                            { tabs.map((t,i) => <TabRow key={i} tab={t} closeTab={closeTab} />) }
                        </tbody>
                    </table>
                </div>
                <div className="w-full flex justify-center items-center">
                    <button onClick={closeAll} className="border-white border border-1 cursor-pointer text-white p-1">Close All</button>
                </div>
            </div>
        </div>
    )
}


function TabRow({ tab, closeTab }: {tab: chrome.tabs.Tab, closeTab?: (id:number) => {}}) {
    return (
        <tr>
            <td>{tab.id}</td>
            <td title={tab.title} className="whitespace-nowrap truncate text-pink-400">{tab.title}</td>
            <td title={tab.url} className="whitespace-nowrap truncate px-2">{tab.url}</td>
            <td title="Close this tab"
                className="flex justify-center items-center"
                onClick={() => { closeTab && closeTab(tab.id) }} >
                <button className="px-2 border border-red-500 select-none cursor-pointer">x</button>
            </td>
        </tr>
    )
}
export default App;