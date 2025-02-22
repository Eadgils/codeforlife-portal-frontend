import * as form from "codeforlife/components/form"
import { useNavigate, useSession } from "codeforlife/hooks"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { Stack } from "@mui/material"
import { submitForm } from "codeforlife/utils/form"

import BaseForm from "../BaseForm"
import { paths } from "../../../routes"
import { useLoginWithOtpMutation } from "../../../api/sso"

export interface OtpProps {}

const Otp: FC<OtpProps> = () => {
  const [loginWithOtp] = useLoginWithOtpMutation()
  const navigate = useNavigate()

  return useSession(
    ({ otp_bypass_token_exists }) => (
      <BaseForm
        themedBoxProps={{ userType: "teacher" }}
        header="Welcome"
        subheader="Please enter the token generated by your token generator."
        initialValues={{ otp: "" }}
        onSubmit={submitForm(loginWithOtp, {
          then: () => {
            navigate(paths.teacher.dashboard.tab.school._)
          },
        })}
      >
        <form.OtpField />
        {otp_bypass_token_exists && (
          <LinkButton
            className="body"
            to={paths.login.teacher.otp.bypassToken._}
          >
            Use an otp-bypass token
          </LinkButton>
        )}
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <LinkButton to={paths.login.teacher._} variant="outlined">
            Cancel
          </LinkButton>
          <form.SubmitButton>Log in</form.SubmitButton>
        </Stack>
      </BaseForm>
    ),
    { userType: "teacher", next: false },
  )
}

export default Otp
