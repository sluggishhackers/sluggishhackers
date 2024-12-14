import axios from "axios";

enum EVENT_OCCURED_BY {
  MANUAL = "MANUAL",
  SUBSCRIBER = "SUBSCRIBER",
}

export const registerEmailToAddressBook = async ({
  apiKey,
  addressBookId,
  subscribers,
  options,
}: {
  apiKey: string;
  addressBookId: string;
  subscribers: Record<string, string>[];
  groupIds?: string[];
  options?: {
    eventOccuredBy?: EVENT_OCCURED_BY;
    confirmEmailYN?: "Y" | "N";
    version?: "v1";
  };
}) => {
  return axios.post(
    `https://api.stibee.com/${options?.version || "v1"}/lists/${addressBookId}/subscribers`,
    {
      eventOccuredBy: options?.eventOccuredBy || "MANUAL",
      confirmEmailYN: options?.confirmEmailYN || "N",
      subscribers,
    },
    {
      headers: {
        AccessToken: apiKey,
        "Content-Type": "application/json",
      },
    }
  );
};

export const sendAutomatedEmail = async ({
  apiKey,
  automatedEmailTemplateId,
  email,
  variables,
  options,
}: {
  apiKey: string;
  automatedEmailTemplateId: string;
  email: string;
  subscriber: string;
  variables?: Record<string, string>;
  options?: {
    version: "v1.0";
  };
}) => {
  return axios.post(
    `https://stibee.com/api/${options?.version || "v1.0"}/auto/${automatedEmailTemplateId}`,
    {
      subscriber: email,
      ...(variables || {}),
    },
    {
      headers: {
        AccessToken: apiKey,
        "Content-Type": "application/json",
      },
    }
  );
};
