import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import { API_DEV } from "../../Utils";

export const EDITOR_JS_TOOLS = {
  embed: {
    class: Embed,
    inlineToolbar: true,
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  marker: {
    class: Marker,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
  },
  code: Code,
  image: {
    class: Image,
    inlineToolbar: true,
    config: {
      uploader: {
        uploadByFile(file) {
          console.log("IMG: ", file);
          const img = new FormData();
          img.append("image", file);
          // your own uploading logic here
          return fetch(`${API_DEV}image/upload`, {
            method: "POST",
            credentials: "include",
            body: img,
          })
            .then((resp) => resp.json())
            .then((resp) => {
              console.log(resp);
              if (!resp.authenticated) {
                throw new Error(resp.msg);
              }
              return {
                success: 1,
                file: {
                  url: resp.imagePath,
                },
              };
            })
            .catch((err) => {
              console.log("Error ", err);
            });
        },
        // uploadByUrl(url) {
        //   console.log("IMAGE URL: ", url);
        //   return {
        //     success: 1,
        //     file: {
        //       url: url,
        //     },
        //   };
        // },
      },
    },
  },
  raw: {
    class: Raw,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    inlineToolbar: true,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },
  delimiter: Delimiter,
  inlineCode: {
    class: InlineCode,
    inlineToolbar: true,
  },
  simpleImage: {
    class: SimpleImage,
    inlineToolbar: true,
  },
};
