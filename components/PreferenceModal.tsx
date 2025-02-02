import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPreferenceForm } from "./UserPreferenceForm"
import type { UserPreference } from "../utils/pizzaUtils"

interface PreferenceModalProps {
  onSubmit: (preference: UserPreference) => void
  initialPreference?: UserPreference
  triggerButton: React.ReactNode
}

export const PreferenceModal: React.FC<PreferenceModalProps> = ({ onSubmit, initialPreference, triggerButton }) => {
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (preference: UserPreference) => {
    onSubmit(preference)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{initialPreference ? "Edit" : "Add"} Pizza Preferences</DialogTitle>
          <DialogDescription>Select your preference for each pizza topping.</DialogDescription>
        </DialogHeader>
        <UserPreferenceForm onSubmit={handleSubmit} initialPreference={initialPreference} />
      </DialogContent>
    </Dialog>
  )
}

