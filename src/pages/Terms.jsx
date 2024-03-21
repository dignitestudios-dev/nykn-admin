import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Terms = () => {
  const { palette } = useContext(GlobalContext);
  return (
    <div className="w-full h-auto flex flex-col justify-start items-start">
      <div className="w-full h-auto  flex flex-col justify-start items-center px-2 md:px-10 py-2 md:py-6 lg:py-8 mt-10 gap-4 my-16 lg:gap-8">
        <div className="w-full h-auto flex flex-col gap-2 items-center justify-center">
          <h1
            style={{ color: palette?.brand }}
            className="text-4xl  font-bold  "
          >
            Terms & Conditions
          </h1>
          <p>
            <strong>Updated at January 1st, 2024</strong>
          </p>
        </div>

        <div className="w-full lg:w-[90%] h-auto px-0 lg:px-20 relative">
          <div className="w-full h-auto z-[1000] rounded-3xl flex flex-col gap-3 justify-start items-start  text-lg font-medium bg-gray-50 p-6 lg:p-10 ">
            <h2>General Terms</h2>
            <p>
              By accessing and placing an order with Now You Know Nashville, you
              confirm that you are in agreement with and bound by the terms of
              service contained in the Terms & Conditions outlined below. These
              terms apply to the entire Mobile Application and any email or
              other type of communication between you and Now You Know
              Nashville.
            </p>
            <p>
              Under no circumstances shall Now You Know Nashville team be liable
              for any direct, indirect, special, incidental or consequential
              damages, including, but not limited to, loss of data or profit,
              arising out of the use, or the inability to use, the materials on
              this site, even if Now You Know Nashville team or an authorized
              representative has been advised of the possibility of such
              damages. If your use of materials from this site results in the
              need for servicing, repair or correction of equipment or data, you
              assume any costs thereof.
            </p>
            <p>
              Now You Know Nashville will not be responsible for any outcome
              that may occur during the course of usage of our resources. We
              reserve the rights to change prices and revise the resources usage
              policy in any moment.
            </p>

            <h2>License</h2>
            <p>
              Now You Know Nashville grants you a revocable, non-exclusive,
              non-transferable, limited license to download, install and use the
              app strictly in accordance with the terms of this Agreement.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              In no event shall Now You Know Nashville, nor its directors,
              employees, partners, agents, suppliers, or affiliates, be liable
              for any indirect, incidental, special, consequential or punitive
              damages, including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from (i) your
              access to or use of or inability to access or use the Service;
              (ii) any conduct or content of any third party on the Service;
              (iii) any content obtained from the Service; and (iv) unauthorized
              access, use or alteration of your transmissions or content,
              whether based on warranty, contract, tort (including negligence)
              or any other legal theory, whether or not we have been informed of
              the possibility of such damage, and even if a remedy set forth
              herein is found to have failed of its essential purpose.
            </p>

            <h2>Privacy Policy</h2>
            <p>
              Your privacy is important to us. It is Now You Know Nashville's
              policy to respect your privacy regarding any information we may
              collect from you across our website,{" "}
              <a href="www.nowyouknownashville.com">
                www.nowyouknownashville.com
              </a>
              , and other sites we own and operate.
            </p>
            <p>
              We only ask for personal information when we truly need it to
              provide a service to you. We collect it by fair and lawful means,
              with your knowledge and consent. We also let you know why we’re
              collecting it and how it will be used.
            </p>
            <p>
              Read our full Privacy Policy{" "}
              <a href="www.nowyouknownashville.com/privacy-policy">here</a>.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about our Terms & Conditions, feel free
              to contact us.
            </p>
            <p>
              Via this Link:{" "}
              <a href="www.nowyouknownashville.com/contact">
                www.nowyouknownashville.com/contact
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
