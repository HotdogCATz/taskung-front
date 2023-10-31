function Status({ status}) {

    return (
        <>
            {status === 'in-queue' ?
                <div className="my-auto mr-2 w-[25px] h-[25px] rounded-md bg-gray-500"></div>

                // <div className="flex rounded-md overflow-hidden">
                //     <div className="w-[25px] h-[25px] bg-gray-500"></div>
                //     <p className="ml-4"></p>
                // </div>
            :
                <div></div>
            }
            {status === 'in-progress' ?
                <div className="my-auto mr-2 w-[25px] h-[25px] rounded-md bg-amber-500"></div>

                // <div className="flex rounded-md overflow-hidden">
                //     <div className="w-[25px] h-[25px] bg-amber-500"></div>
                //     <p className="ml-4"></p>
                // </div>
            :
                <div></div>
            }
            {status === 'complete' ?
                <div className="my-auto mr-2 w-[25px] h-[25px] rounded-md bg-green-500"></div>

                // <div className="flex rounded-md overflow-hidden">
                //     <div className="w-[25px] h-[25px] bg-green-500"></div>
                //     <p className="ml-4"></p>
                // </div>
            :
                <div></div>
            }
        </>
    );
}
export default Status;