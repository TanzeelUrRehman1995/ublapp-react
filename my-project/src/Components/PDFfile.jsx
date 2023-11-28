import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { createTw, } from "react-pdf-tailwind";
import TransactionHistory from "./TransactionHistory";

// The 'theme' object is your Tailwind theme config
const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

const downLoad = () => (
    <div>
      <PDFDownloadLink document={<TransactionHistory />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
    </div>
  );

export default function MyPdf() {
  return (
   <div className="w-full h-[100vh] flex justify-center items-center" id="Teansactionfile">
    <div style={tw(" w-1/2")}>
      <div className="container">
        
      </div>
    <Document>
      <Page size="A4" style={tw("p-12 ")}>
            
          <TransactionHistory />
      </Page>
    </Document>
    </div>
    </div>
  );
}