"use client";

import { useState } from "react";
import { payMatrix } from "@/data/payMatrix";

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

    const [form, setForm] = useState({
        doj: null,
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
                <label className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                    Date of Joining

                    <span
                        className="text-gray-400 cursor-pointer text-xs border rounded-full w-4 h-4 flex items-center justify-center"
                        title="Joining year is not counted for LTC eligibility"
                    >
                        i
                    </span>
                </label>

                <div className="relative">
                    <DatePicker
                        selected={form.doj}
                        onChange={(date) => updateField("doj", date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        wrapperClassName="w-full"
                        className="w-full border border-gray-300 rounded-md pl-4 pr-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholderText="Select Month & Year"
                    />


                </div>
            </div>



            {/* HOME STATE */}
            <div>
                <label className="text-sm text-gray-600">
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
                <label className="text-sm text-gray-600">
                    HQ State/ Office State
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
                <label className="text-sm text-gray-600">
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