import React, { useEffect, useRef, useState } from "react";
import { getKey, setKey } from "../../utils/object";
import { collection, doc, getDoc } from "firebase/firestore";

function BookMan() {
  const [items, setItems] = useState<chrome.bookmarks.BookmarkTreeNode[]>([]);
  const bookmarks = useRef<chrome.bookmarks.BookmarkTreeNode[]>([]);
  const [path, setPath] = useState<number[]>([]);
  const [strPath, setStrPath] = useState<string>("");

  useEffect(() => {
    // Get all the bookmark folders
    chrome.bookmarks.getTree((tree) => {
      bookmarks.current = tree[0].children;
      setPath((prev) => [...prev]);
      console.log(tree);
    });
  }, []);

  const navigate = (id: number, folder: boolean) => {
    if (folder) {
      setPath((prev) => [...prev, id]);
    }
  };

  const moveToSecretFolder = async () => {
   
  }

  useEffect(() => {
    console.log("path", path, getKey(bookmarks.current, path));
    if (path.length === 0) {
      setItems(bookmarks.current);
      return;
    }
    const [item, strPath] = getKey(bookmarks.current, path);
    if (item) {
      setItems(item);
      setStrPath(strPath.join(" > "));
    }
  }, [path]);

  return (
    <div className="w-full h-full bg-gray-700 p-3 text-white">
      <div className="w-full p-2 h-full border border-gray-400 overflow-auto">
        <button
          onClick={() => {
            path.pop();
            setPath([...path]);
          }}
        >
          Back
        </button>
        <br />
        {strPath}
        <div className="w-full grid grid-cols-2">
          {items.map((item, i) => (
            <BookManRow key={i} item={item} onClick={navigate} onMove={moveToSecretFolder} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BookManRow({
  item,
  onClick,
  onMove,
}: {
  item: chrome.bookmarks.BookmarkTreeNode;
  onClick?: (id: number, folder?: boolean) => void;
  onMove?: () => void;
}) {
  const isFolder = item.children?.length > 0;
  return (
    <div
      onClick={() => onClick(item.index, isFolder)}
      className={`text-white my-2 px-2 border border-white border-1 ${
        isFolder ? "" : "bg-gray-500"
      }`}
    >
      {item.title} {isFolder && <>({item.children?.length})</>}
      <button onClick={onMove}>- move</button>
    </div>
  );
}
export default BookMan;
