import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const StoreSkeleton = () => {
  const { palette } = useContext(GlobalContext);
  const arr = [1, 2, 3, 4, 5, 6];
  return arr?.map((ar) => {
    return (
      <tr key={ar}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="animate-pulse h-10 w-10 rounded-md"
                src={
                  "data:image/png;base64,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"
                }
                alt=""
              />
            </div>
            <div className="ml-4">
              <div
                className="animate-pulse text-sm font-medium w-20 h-3 rounded-full"
                style={{
                  background: palette?.dark_contrast_background,
                }}
              ></div>
              <div
                className="animate-pulse mt-2 text-sm w-40 h-2 rounded-full"
                style={{
                  color: palette?.light_contrast_color,
                  background: palette?.dark_contrast_background,
                }}
              ></div>
            </div>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className="px-2 w-12 h-5 inline-flex text-xs leading-5 font-semibold rounded-full "
            style={{
              color: palette?.light_contrast_color,
              background: palette?.dark_contrast_background,
            }}
          ></span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm  ">
          <span
            className="px-2 w-3 h-3 inline-flex text-xs leading-5 font-semibold rounded-full "
            style={{
              color: palette?.light_contrast_color,
              background: palette?.dark_contrast_background,
            }}
          ></span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm ">
          <span
            className="px-2 w-3 h-3 inline-flex text-xs leading-5 font-semibold rounded-full "
            style={{
              color: palette?.light_contrast_color,
              background: palette?.dark_contrast_background,
            }}
          ></span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap w-auto  text-right text-sm font-medium">
          <span
            className="px-2 w-16 h-4 inline-flex text-xs leading-5 font-semibold rounded-full "
            style={{
              color: palette?.light_contrast_color,
              background: palette?.dark_contrast_background,
            }}
          ></span>
          <span
            className="px-2 w-16 h-4 inline-flex text-xs leading-5 font-semibold rounded-full "
            style={{
              color: palette?.light_contrast_color,
              background: palette?.dark_contrast_background,
            }}
          ></span>
        </td>
      </tr>
    );
  });
};

export default StoreSkeleton;
