import { getGambleOverview } from "@s/gambleOverviewSlice"
import { approveGamble } from "@s/gambleSlice"
import { useAppDispatch, useAppSelector } from "@s/store"

export interface GambleGradeApprovalProps {
  studentDbId: number
  teamDbId: number
  verdict: string
  avgGrade: number
  gambleGrade: number
}

export default function GambleGradeApproval({ studentDbId, teamDbId, avgGrade, gambleGrade }: GambleGradeApprovalProps) {
  const dispatch = useAppDispatch()

  async function approveOrDeny(approve: boolean) {
    await dispatch(approveGamble({ studentId: studentDbId, teamId: teamDbId, approve: approve }))
    dispatch(getGambleOverview({ studentId: studentDbId, teamId: teamDbId }))
  }
  const status = useAppSelector(state => state.gambleOverview.approvalStatus)


  return (
    <div className="p-2 bg-white rounded-lg shadow-md">
      <div className="flex flex-col space-y-4 m-2">
        <label>
          {status === 'APPROVED'
            ? `Student's gambled grade was approved: ${avgGrade}.`
            : status === 'REJECTED'
              ? `Student's gambled grade was denied.`
              : `Student's gambled grade is pending.`}
        </label>

        {status === 'PENDING' && (
          <>
            <div className="flex flex-row space-x-10 mx-28">
              <label className="bg-highlight rounded-xl w-min text-white px-2 py-1">{`avg: ${avgGrade}`}</label>
              <label className="bg-background rounded-xl w-min text-white px-2 py-1">{`gamble: ${gambleGrade}`}</label>
            </div>
            <div className="flex flex-row space-x-10 mx-28 text-xl font-bold">
              <button className="bg-highlight rounded-xl w-min text-white px-2 py-1" onClick={() => approveOrDeny(true)}>
                approve
              </button>
              <button className="bg-background rounded-xl w-min text-white px-2 py-1" onClick={() => approveOrDeny(false)}>
                deny
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
