export interface GambleGradeApprovalProps {
  studentDbId: number
  teamDbId: number
  gotVerdict: boolean
  verdict: boolean
  grade: number
}

export default function GambleGradeApproval({ studentDbId, teamDbId, gotVerdict, grade, verdict }: GambleGradeApprovalProps) {
  function approveOrDeny(approve: boolean) {
    // dispatch(approveGambleGrade(studentDbId, teamDbId, approve))
  }
  return (
    <div className="p-2 bg-white rounded-lg shadow-md  ">
      <div className="flex flex-col space-y-4 m-2">
        <label>
          {(gotVerdict) ?
            `Student's gambled grade was ${verdict ? `approved ${grade}.` : "denied."}` :
            `Approve or Deny the student's gambled grade: ${grade}`
          }
        </label>
        {(gotVerdict) ? <></> :
          <div className="flex flex-row space-x-16 mx-28 text-lg ">
            <button className="bg-highlight rounded-xl w-min text-white px-2 py-1" onClick={() => approveOrDeny(true)}> approve</button>
            <button className="bg-background rounded-xl w-min text-white px-2 py-1" onClick={() => approveOrDeny(false)}> deny</button>
          </div>
        }
      </div>
    </div>
  )
}

