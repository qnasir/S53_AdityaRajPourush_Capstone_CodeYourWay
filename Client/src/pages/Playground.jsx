import Navbar_1 from "@/components/Navbar_1";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GearIcon, Pencil2Icon, TriangleRightIcon, UploadIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const Playground = () => {
  return (
    <div>
      <Navbar_1 />
      <div className="w-[99vw] m-auto h-[92vh] pt-2">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border h-[100%] w-full"
        >
          <ResizablePanel defaultSize={65} minSize={20}>
            <div className="flex items-center justify-center min-w-36">
              <div className="nav bg-secondary h-[5vh] flex items-center w-full px-3 justify-between m-1 rounded-sm">
                <div className="flex items-center justify-between w-[20vw]">
                  <Input className="p-1 border-secondary-foreground h-[3.7vh] max-w-[180px]"/>
                  <Button className="mx-1" variant="outline"><UploadIcon className="mx-0.5"/>Save</Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button size="icon" className="mx-1">
                          <Pencil2Icon className="h-5 w-7"/>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Note</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center justify-between w-[18vw]">
                  <TooltipProvider >
                    <Tooltip>
                      <TooltipTrigger>
                      <Button size="icon" ><GearIcon className="h-5 w-7"/></Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Settings</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Select defaultValue="C++">
                    <SelectTrigger className="border-2 border-sky-500 w-[100px]">
                      <SelectValue placeholder="C++"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="C++">C++</SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="JavaScript">JavaScript</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-[#32BEA6] p-">
                    Run Code <img width="20" height="20" src="https://img.icons8.com/flat-round/64/000000/play--v1.png" alt="play--v1"/>
                  </Button>
                </div>
              </div>
            </div>

            <div className="editor p-1">
                
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={10}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={75} minSize={20}>
                <div className="nav bg-secondary h-[5vh] flex items-center px-3 justify-between m-1 rounded-sm">
                  <span className="font-semibold">Output</span>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel minSize={10}>
              <div className="nav bg-secondary h-[3vh] flex items-center px-3 justify-between m-1 rounded-sm">
                  <span className="font-semibold">Input</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Playground;
