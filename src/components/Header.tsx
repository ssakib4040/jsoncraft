import { Fragment, useEffect, useState, useRef } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
// import utils from "../utils";

// interface peopleInterface {
//   id: number;
//   name: string;
// }

// const people: peopleInterface[] = [
//   { id: 1, name: "Select API functions" },
//   { id: 2, name: "Select API functions" },
// ];

interface apiInterface {
  name: string;
  functions: string[];
}

const apiList: apiInterface[] = [
  {
    name: "User",
    functions: [
      "id()",
      "name()",
      "email()",
      "username()",
      "phone()",
      "image()",
      "address()",
      "website()",
      "company()",
    ],
  },
  {
    name: "Post",
    functions: [
      "title()",
      "body()",
      "userId()",
      "comments()",
      "createdAt()",
      "updatedAt()",
    ],
  },
];

export default function Header() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  // const filteredPeople: apiInterface[] =
  //   query === ""
  //     ? people
  //     : people.filter((person) =>
  //         person.name
  //           .toLowerCase()
  //           .replace(/\s+/g, "")
  //           .includes(query.toLowerCase().replace(/\s+/g, ""))
  // );

  const filteredApiList: apiInterface[] = apiList
    .filter((api) =>
      api.functions.some((func) =>
        func.toLowerCase().includes(query.toLowerCase())
      )
    )
    .map((api) => ({
      name: api.name,
      functions: api.functions.filter((func) =>
        func.toLowerCase().includes(query.toLowerCase())
      ),
    }));

  useEffect(() => {
    // const options: string[] = Object.keys(utils).map((funcName) => {
    //   return funcName;
    // });
  }, []);

  return (
    <header className="top-0 sticky z-50">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-zinc-800">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              JSONCraft
            </span>
          </a>

          <div className="flex items-center lg:order-2">
            <div className=" w-72">
              <Combobox>
                <div className="relative mt-1">
                  {/* input */}
                  <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                      placeholder="Search API functions"
                      className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-white focus-within:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white focus:ring-white"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      onClick={() => inputRef.current?.click()}
                      onBlur={() => setTimeout(() => setQuery(""), 100)}
                    />
                    <Combobox.Button
                      className="absolute inset-y-0 right-0 flex items-center pr-2"
                      // @ts-expect-error this is a valid ref
                      ref={inputRef}
                    >
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>

                  {/* menu */}
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {filteredApiList.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                          API not found
                        </div>
                      ) : (
                        filteredApiList.map((api) => {
                          return (
                            <div key={api?.name} className="mb-3">
                              <div className="relative cursor-default select-none py-2 pl-2 pr-2 font-bold text-white bg-black">
                                {api?.name}
                              </div>

                              {api?.functions.map((func) => {
                                return (
                                  <div
                                    onClick={() => {}}
                                    key={`${api?.name}-${func}`}
                                    className={`relative cursor-pointer select-none py-[2px] pl-6 pr-6 text-gray-900`}
                                  >
                                    <>
                                      <span className={`block truncate`}>
                                        {func}
                                      </span>
                                    </>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </div>

            <a
              href="https://github.com/ssakib4040/jsoncraft"
              target="_blank"
              className="text-white bg-primary-700 flex hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
