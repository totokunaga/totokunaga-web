import { useRouter } from "next/router";
import textStyle from "@styles/text.module.scss";
import { oauthLogin } from "@utils/functions";
import { OAuthProvider } from "@utils/types";
import { Button } from "../Button";
import { Icon, IconType } from "../Icon";

type ProviderButtonType = {
  name: string;
  icon: IconType;
  providerId: OAuthProvider;
};

const providers: ProviderButtonType[] = [
  { name: "Google", icon: "google", providerId: "google" },
  { name: "Facebook", icon: "facebook", providerId: "facebook" },
  { name: "Github", icon: "github", providerId: "github" },
];

export const LoginModalContent: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const router = useRouter();

  return (
    <div>
      <p
        className={textStyle.xlarger}
        style={{ fontWeight: 700, marginBottom: "0.75em" }}
      >
        Sign in with
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {providers.map(({ name, icon, providerId }, i) => (
          <Button
            key={providerId}
            onClick={() => oauthLogin(providerId, router.pathname)}
            width={"100%"}
            margin={`auto auto ${
              i === providers.length - 1 ? "auto" : "1em"
            } auto`}
            padding={".75em 1em"}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Icon
                icon={icon}
                width={"1.65em"}
                margin={"auto .5em auto auto"}
              />
              <span>{name}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
