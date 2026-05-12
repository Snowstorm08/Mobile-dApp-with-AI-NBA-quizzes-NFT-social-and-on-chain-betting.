import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: ReactNode;
};

export default function BottomSheet({
  open,
  setOpen,
  children,
}: Props) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={setOpen}
      >
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* Container */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-center">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transform transition ease-in-out duration-200"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel
                className="
                  relative
                  w-full
                  max-w-[500px]
                  rounded-t-2xl
                  bg-white
                  shadow-2xl
                  pointer-events-auto
                "
              >
                {/* Drag Indicator */}
                <button
                  type="button"
                  aria-label="Close panel"
                  onClick={() => setOpen(false)}
                  className="
                    absolute
                    left-1/2
                    top-3
                    h-1.5
                    w-10
                    -translate-x-1/2
                    rounded-full
                    bg-gray-300
                    transition
                    hover:bg-gray-400
                  "
                />

                {/* Content */}
                <div
                  className="
                    max-h-[90vh]
                    overflow-y-auto
                    px-5
                    pb-6
                    pt-10
                  "
                >
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
