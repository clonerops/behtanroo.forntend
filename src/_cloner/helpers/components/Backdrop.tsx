import React, { FC } from "react";
import { toAbsoluteUrl } from "../AssetHelpers";

interface IProps {
    loading: boolean;
}

const Backdrop: FC<IProps> = () => {
    return (
        <div className="flex justify-center items-center fixed w-full h-full top-0 right-0 bg-white transition z-[9999] ease-out !bg-opacity-70">
            <div className="flex flex-col justify-center items-center">
                <img
                    src={`${toAbsoluteUrl("/media/logos/640-logo.png")}`}
                    alt="background"
                    className="animate-bounce"
                    width={120}
                    height={120}
                />
            </div>
        </div>
    );
};

export default React.memo(Backdrop);
