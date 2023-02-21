import textStyle from "@styles/text.module.scss";
import { oauthLogin, OAuthProvider } from "@utils/functions";
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
];

export const LoginModalContent: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <div>
      <p
        className={textStyle.xlarger}
        style={{ fontWeight: 700, marginBottom: "0.75em" }}
      >
        Sign in to
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
            onClick={() => oauthLogin(providerId)}
            width={"100%"}
            margin={`auto auto ${
              i === providers.length - 1 ? "auto" : "1em"
            } auto`}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Icon
                icon={icon}
                width={"1.65em"}
                fill={"#e6e7ed"}
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
