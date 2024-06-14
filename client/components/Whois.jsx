import React from "react";


const Whois = (props) => {
  return (
    <div className={"my-4"}>
      <h5 className={"mx-1"}>WHO IS Data</h5>
      <div className={`bg-white dark:bg-slate-700 rounded-md overflow-hidden`}>
        <div className={"w-full px-4 py-3 flex flex-wrap"}>
          {Object.keys(props.whois).map((key) => {
            if (key === "nets" || props.whois[key] === null) {
              return;
            }
            return (
              <div key={key} className={"my-2 ml-2 mr-4 flex flex-col"}>
                <div className="text-xs font-bold brightness-75 mr-1">
                  {key}:
                </div>
                <div className="text-xs font-bold font-Roboto">
                  {props.whois[key]}
                </div>
              </div>
            );
          })}

          <div>
            <div className={"ml-2 mt-8 text-sm"}>Networks</div>
            <div className={"flex flex-wrap"}>
              {props.whois.nets?.map((net) => (
                <div
                  key={JSON.stringify(net)}
                  className={"m-2 rounded-md border border-1 border-white"}
                >
                  {Object.keys(net).map((key) => {
                    if (net[key] === null) {
                      return;
                    }
                    return (
                      <div key={key} className={"my-2 mx-4 flex flex-col"}>
                        <div className="text-xs font-bold brightness-75">
                          {key}
                        </div>
                        <div className="text-xs font-bold font-Roboto">
                          {net[key]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whois;
