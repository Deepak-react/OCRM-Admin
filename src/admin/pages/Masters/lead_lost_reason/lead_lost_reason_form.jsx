import { useState } from "react"

export function LostReasonForm({onSubmit}) {
    const [lostReason, setLostReason] = useState("");
    const [close,setClose]=useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!lostReason.trim()) return;
        onSubmit(lostReason) ;
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-12 rounded">
                <div className="flex flex-row justify-around">
                    <h3 className="font-bold">Create New Lead Lost </h3>
                </div>
                
                <input
                className="p-2 rounded w-full border border-black"
                    value={lostReason}
                    placeholder="Enter lost reason here..."
                    onChange={(e) => setLostReason(e.target.value)}
                    type="text" />
                <button className="p-1 bg-black text-white rounded"type="submit">Create Lost Reason</button>
                <button className="p-1 bg-red-500 text-black rounded" onClick={()=>setLostReason("")} >Clear</button>
            </form>
        </div>
    )
}