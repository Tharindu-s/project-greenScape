"use client";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { exchangeState } from "../Constants/Exchange-state-data";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { waveform } from "ldrs";

waveform.register();

const SentRequestList = () => {
  const { user } = useAuthContext();
  const recieverId = user?.userId;
  const [loading, setLoading] = useState(true);
  const [exchange, setExchange] = useState(null);
  const [selectedState, setSelectedState] = useState(""); // State to store selected state value
  const [selectedRequestId, setSelectedRequestId] = useState(""); // State to store selected request ID

  // Fetch exchange requests
  useEffect(() => {
    if (recieverId) {
      fetch(`/api/exchange/user/sent/${recieverId}`)
        .then((res) => res.json())
        .then((exchange) => {
          setExchange(exchange);
        })
        .catch((error) => {
          console.error("Error fetching exchange data:", error);
        })
        .finally(() => {
          // setLoading(false);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    }
  }, [recieverId]);

  // Function to handle state change selection
  const handleStateChange = (event, requestId) => {
    setSelectedState(event.target.value);
    setSelectedRequestId(requestId);
  };

  // Function to update exchange state via PATCH request
  const updateExchangeState = async () => {
    if (selectedState && selectedRequestId) {
      try {
        const response = await fetch(`/api/exchange/${selectedRequestId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ senderState: selectedState }),
        });

        if (!response.ok) {
          const json = await response.json();
          toast.error(json.error || "Failed to update state."); // Show error toast
        } else {
          toast.success("State updated successfully!"); // Show success toast
          console.log("State updated successfully");
        }
      } catch (error) {
        console.error("Error updating state:", error);
        toast.error("An error occurred while updating the state."); // Handle network errors
      }
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center mx-auto text-center">
          <l-waveform
            size="35"
            stroke="3.5"
            speed="1"
            color="black"
          ></l-waveform>
        </div>
      ) : exchange && exchange.length > 0 ? (
        <div className="w-full md:px-10 lg:px-12 xl:px-24 2xl:px-64">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product Name</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Request Description</TableHead>
                <TableHead>Your state</TableHead>
                <TableHead>Their state</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            {exchange.map((request) => (
              <TableBody key={request._id}>
                <TableRow>
                  <TableCell>
                    <Link href={`/greenscape/products/${request.productId}`}>
                      {request.productName}{" "}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/greenscape/profile/${request.recieverId}`}>
                      {request.recieverName}
                    </Link>
                  </TableCell>
                  <TableCell>{request.description}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <p className="p-3 text-white bg-accent rounded-xl">
                          {request.senderState}
                        </p>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Change the current state
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Changes you make will be visible to the other party.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <select
                          value={selectedState}
                          onChange={(event) =>
                            handleStateChange(event, request._id)
                          }
                        >
                          {exchangeState.map((state, index) => (
                            <option key={index} value={state.value}>
                              {state.value}
                            </option>
                          ))}
                        </select>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={updateExchangeState}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                  <TableCell>{request.recieverState}</TableCell>
                  <TableCell className="text-right">
                    {request.createdAt.slice(0, 10)}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      ) : (
        <p className="text-center">No requests yet</p>
      )}
    </div>
  );
};

export default SentRequestList;
