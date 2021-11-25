import { Text } from "./libs/Text";
import { Heading } from "./libs/Heading";
import { Button } from "./libs/Button";
import { Textarea } from "./libs/Textarea";
import { Input } from "./libs/Input";
import { PasswordForm } from "./libs/PasswordForm";

export const App = () => {
  return (
    <>
      <Text text="true" />
      <Heading tag="h1">
        <span>Hello Bomber!</span>
      </Heading>
      <Button onClick={() => console.log('clicked!')} title="Button1" type="primary" width={96} />
      <Button onClick={() => console.log('clicked!!')} title="Button2" type="secondary" />
      <Button onClick={() => console.log('clicked!!!')} title="Button3" type="error" />

      <Textarea width={500} maxLength={10} />
      <Input type="text" />
      <PasswordForm onSubmit={(password) => console.log(password)} />
    </>
  );
}