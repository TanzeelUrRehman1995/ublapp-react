import React, { useRef, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import statementLogo from '../images/statementlogo.png';



const TABLE_HEAD = [
  "Transaction_id",
  "Sender",
  "Receiver",
  "Transaction Amount",
];
const TABLE_ROWS = JSON.parse(localStorage.getItem("transactions")) || [];

function TransactionHistory() {
  const user = JSON.parse(sessionStorage.getItem("user")) || {};
  const availableBalance = user.available_balance || 0;


  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 40;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("TransactionHist.pdf");
    });
  };


  return (
    
    <div>
      <div ref={pdfRef}>
        <div className="flex justify-between">
          <div className="invoicelogo mb-3">
            <img className="w-20" src={statementLogo} />
            </div>
          <div>
            <h1 className="text-[#1296db] text-lg font-semibold">Account Statement</h1>
          </div>
        </div>
        <div className="bg-[#1296db] flex justify-center">
          <h1 className="px-3 py-2 font-bold text-white">
            Transaction History
          </h1>
        </div>
        <Card className="h-full w-full">
          <table className="w-full min-w-max table-auto text-left shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 font-semibold p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                (
                  { transaction_id, sender, receiver, transaction_amount },
                  index
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={transaction_id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {transaction_id}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {sender}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {receiver}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {transaction_amount}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Card>
        <div className="bg-[#1296db] flex justify-center ">
          <h1 className="px-3 py-2 font-bold text-white">
            Available Balance : Rs {availableBalance}{" "}
          </h1>
        </div>

       
      </div>
      <div className="mt-9 flex justify-center">
          <button
            className="bg-[#1296db] text-white font-semibold px-5 py-2 rounded-md"
            onClick={downloadPDF}
          >
            Generate PDF
          </button>
        </div>
    </div>
  );
}

export default TransactionHistory;
