import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Terms = () => {
  const { palette } = useContext(GlobalContext);
  return (
    <div className="w-full h-auto flex flex-col justify-start items-start">
      <div className="w-full h-auto  flex flex-col justify-start items-center px-2 md:px-10 py-2 md:py-6 lg:py-8 mt-10 gap-4 my-16 lg:gap-8">
        <div className="w-full h-auto flex items-center justify-center">
          <h1
            style={{ color: palette?.brand }}
            className="text-4xl  font-bold  "
          >
            Terms of Service
          </h1>
        </div>

        <div className="w-full lg:w-[90%] h-auto px-0 lg:px-20 relative">
          <div className="w-full h-auto z-[1000] rounded-3xl flex flex-col gap-3 justify-start items-start  text-lg font-medium bg-gray-50 p-6 lg:p-10 ">
            <div className="w-full flex flex-col gap-1 justify-start items-start">
              <h1
                style={{ color: palette?.brand }}
                className=" font-semibold text-xl"
              >
                1. ACCEPTANCE OF TERMS
              </h1>
              <span className="text-gray-900 font-medium text-md">
                BY ACCESSING AND USING THE MAIDSIMPL APP OR WEBSITE ("SERVICE"),
                YOU ACCEPT AND AGREE TO BE BOUND BY THE TERMS AND PROVISIONS OF
                THIS AGREEMENT. IN ADDITION, USING ANY OF OUR SERVICES WILL
                CONSTITUTE ACCEPTANCE OF THIS AGREEMENT.
              </span>
            </div>

            <div className="w-full flex flex-col gap-1 justify-start items-start">
              <h1
                style={{ color: palette?.brand }}
                className=" font-semibold text-xl"
              >
                2. SERVICE PROVISION
              </h1>
              <span className="text-gray-900 font-medium text-md">
                MAIDSIMPL PROVIDES A PLATFORM CONNECTING USERS WITH CLEANING
                PROFESSIONALS. WE DO NOT TAKE RESPONSIBILITY FOR THE DIRECT
                INTERACTIONS BETWEEN USERS AND CLEANING PROFESSIONALS.
              </span>
            </div>

            <div className="w-full flex flex-col gap-1 justify-start items-start">
              <h1
                style={{ color: palette?.brand }}
                className=" font-semibold text-xl"
              >
                3. USER REGISTRATION
              </h1>
              <span className="text-gray-900 font-medium text-md">
                USERS MIGHT BE REQUIRED TO REGISTER AN ACCOUNT TO USE CERTAIN
                FEATURES OF THE SERVICE. USERS AGREE TO PROVIDE ACCURATE,
                CURRENT, AND COMPLETE INFORMATION DURING THE REGISTRATION
                PROCESS AND UPDATE SUCH INFORMATION TO KEEP IT ACCURATE.
              </span>
            </div>

            <div className="w-full flex flex-col gap-1 justify-start items-start">
              <h1
                style={{ color: palette?.brand }}
                className=" font-semibold text-xl"
              >
                4. PAYMENTS
              </h1>
              <span className="text-gray-900 font-medium text-md">
                ALL PAYMENTS MADE IN CONNECTION TO THE SERVICE WILL BE PROCESSED
                THROUGH A SECURE THIRD-PARTY PAYMENT PROCESSOR.
              </span>
            </div>

            <div className="w-full flex flex-col gap-1 justify-start items-start">
              <h1
                style={{ color: palette?.brand }}
                className=" font-semibold text-xl"
              >
                5. CANCELLATIONS
              </h1>
              <span className="text-gray-900 font-medium text-md">
                BOOKINGS CANCELED LESS THAN 24 HOURS BEFORE THE SCHEDULED
                SERVICE MAY INCUR A CANCELLATION FEE. PLEASE VIEW OUR
                CANCELLATION POLICY PAGE FOR FURTHER INFORMATION.
              </span>
            </div>

            <div className="w-full flex flex-col gap-1 justify-start items-start">
              <h1
                style={{ color: palette?.brand }}
                className=" font-semibold text-xl"
              >
                6. QUALITY ASSURANCE
              </h1>
              <span className="text-gray-900 font-medium text-md">
                MAIDSIMPL COMMITS TO CONNECTING USERS WITH TOP-TIER CLEANING
                PROFESSIONALS AND ENSURING A QUALITY CLEANING EXPERIENCE. IF
                PROBLEMS OCCUR OR YOU ARE DISSATISFIED WITH OUR SERVICES PLEASE
                REACH OUT TO SUPPORT SO WE CAN REMEDY THE SITUATION.
              </span>
            </div>

            <div className="w-full flex flex-col gap-1 justify-start items-start">
              <h1
                style={{ color: palette?.brand }}
                className=" font-semibold text-xl"
              >
                7. PRIVACY
              </h1>
              <span className="text-gray-900 font-medium text-md">
                YOUR USE OF THE SERVICE IS ALSO GOVERNED BY OUR PRIVACY POLICY,
                WHICH CAN BE ACCESSED ON OUR WEBSITE.
              </span>
            </div>

            <div className="w-full flex flex-col gap-1 justify-start items-start">
              <h1
                style={{ color: palette?.brand }}
                className=" font-semibold text-xl"
              >
                8. INTELLECTUAL PROPERTY
              </h1>
              <span className="text-gray-900 font-medium text-md">
                ALL CONTENT AVAILABLE ON THE SERVICE, INCLUDING BUT NOT LIMITED
                TO TEXT, GRAPHICS, LOGOS, AND THE SOFTWARE USED, IS THE PROPERTY
                OF MAIDSIMPL AND PROTECTED BY COPYRIGHT LAWS.
              </span>
            </div>

            <div className="w-full flex flex-col gap-1 justify-start items-start">
              <h1
                style={{ color: palette?.brand }}
                className=" font-semibold text-xl"
              >
                9. LIMITATION OF LIABILITY
              </h1>
              <span className="text-gray-900 font-medium text-md">
                MAIDSIMPL AND ITS AFFILIATES WILL NOT BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING BUT
                NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, WHETHER IN AN
                ACTION IN CONTRACT OR BASED ON NEGLIGENCE, OR OTHER TORT ACTION,
                ARISING OUT OF, OR IN CONNECTION WITH THE USE OF THE SERVICE
                PROVIDED.
              </span>
            </div>

            <div className="w-full flex flex-col gap-1 justify-start items-start">
              <h1
                style={{ color: palette?.brand }}
                className=" font-semibold text-xl"
              >
                10. MODIFICATIONS TO TERMS
              </h1>
              <span className="text-gray-900 font-medium text-md">
                MAIDSIMPL MAY REVISE THESE TERMS & CONDITIONS AT ANY TIME. THE
                MOST CURRENT VERSION WILL ALWAYS BE POSTED ON OUR WEBSITE.
              </span>
            </div>

            <div className="w-full flex flex-col gap-1 justify-start items-start">
              <h1
                style={{ color: palette?.brand }}
                className=" font-semibold text-xl"
              >
                11. GOVERNING LAW
              </h1>
              <span className="text-gray-900 font-medium text-md">
                THIS AGREEMENT AND ANY DISPUTE ARISING OUT OF THE SERVICE WILL
                BE GOVERNED BY THE LAWS OF USA, WITHOUT REGARD TO ITS CONFLICT
                OF LAWS RULES.
              </span>
            </div>

            <div className="w-full flex flex-col gap-1 justify-start items-start">
              <h1
                style={{ color: palette?.brand }}
                className=" font-semibold text-xl"
              >
                12. CONTACT US
              </h1>
              <span className="text-gray-900 font-medium text-md">
                FOR ANY QUESTIONS ABOUT THESE TERMS, PLEASE CONTACT US AT
                <a href="mailto:support@madisimpl.com" className="uppercase">
                  support@maidsimpl.com
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
