"use client";

import { useState } from "react";
import { payMatrix } from "@/data/payMatrix";
import {
    CalendarDays,
    MapPin,
    Building2,
    Layers,
    History
} from "lucide-react";

const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman & Nicobar", "Jammu & Kashmir", "Ladakh",
    "Puducherry", "Chandigarh"
];

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";


export default function BasicInfoForm({ onChange }) {
    const [data, setData] = useState({
        doj: "",
        hometown: "",
        office: "",
        payLevel: "",
    });

    const [error, setError] = useState("");

    const [form, setForm] = useState({
        doj: "",
        hometown: "",
        office: "",
        payLevel: "",
    });

    useEffect(() => {
        onChange(form);
    }, [form]);


    const updateField = (field, value) => {
        const updated = { ...form, [field]: value };
        setForm(updated);
        onChange(updated);
    };



    return (
        <div >

            {/* DOJ */}

            <div className="flex flex-col">
                <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                    <CalendarDays size={16} className="text-blue-500" />
                    Date of Joining

                    <span
                        className="text-gray-400 cursor-pointer text-xs border rounded-full w-4 h-4 flex items-center justify-center"
                        title="Joining year is not counted for LTC eligibility"
                    >
                        i
                    </span>

                </label>

                <div className="relative">
                    <select
                        value={form.doj || ""}
                        onChange={(e) => {
                            updateField("doj", Number(e.target.value));
                            setError(""); // clear error
                        }}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white shadow-sm hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition"
                    >
                        <option value="">Select Year of Joining</option>

                        {Array.from({ length: 40 }, (_, i) => {
                            const year = new Date().getFullYear() - i;
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>



            {/* HOME STATE */}
            <div>
                <label className="text-sm text-gray-600 flex items-center gap-2 mb-1 mt-2">
                    <MapPin size={16} className="text-green-500" />
                    Home Town State
                </label>


                <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.hometown}
                    onChange={(e) => updateField("hometown", e.target.value)}
                >
                    <option value="">Select State</option>
                    {states.map((s) => (
                        <option key={s}>{s}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="text-sm text-gray-600 flex items-center gap-2 mb-1 mt-2">
                    <Building2 size={16} className="text-purple-500" />
                    HQ State / Office State
                </label>

                <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.office}
                    onChange={(e) => updateField("office", e.target.value)}
                >
                    <option value="">Select State</option>
                    {states.map((s) => (
                        <option key={s}>{s}</option>
                    ))}
                </select>
            </div>

            {/* PAY LEVEL */}
            <div>
                <label className="text-sm text-gray-600 flex items-center gap-2 mb-1 mt-2">
                    <Layers size={16} className="text-orange-500" />
                    Pay Level
                </label>

                <select
                    className="w-full border border-gray-300 rounded p-2"
                    value={form.payLevel}
                    onChange={(e) => updateField("payLevel", e.target.value)}
                >
                    <option value="">Select Level</option>

                    {Object.keys(payMatrix).map((l) => {
                        const values = payMatrix[l];
                        const first = values[0];
                        const last = values[values.length - 1];

                        const label =
                            values.length === 1
                                ? `${l} (₹${first})`
                                : `${l} (₹${first} - ₹${last})`;

                        return (
                            <option key={l} value={l}>
                                {label}
                            </option>
                        );
                    })}
                </select>
            </div>


        </div>
    );
}