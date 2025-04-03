
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, ClipboardCheck, UserCheck, Building, BookOpen, Users, Award, ShieldCheck } from 'lucide-react';

export const RoleSelector = () => {
  const roles = [
    { id: 'super_admin', name: 'Super Admin', icon: ShieldCheck },
    { id: 'student', name: 'Student', icon: GraduationCap },
    { id: 'supervisor', name: 'Supervisor', icon: UserCheck },
    { id: 'registrar', name: 'Registrar', icon: ClipboardCheck },
    { id: 'hod', name: 'Head of Department', icon: Building },
    { id: 'examiner', name: 'Examiner', icon: BookOpen },
    { id: 'alumni', name: 'Alumni', icon: Award },
    { id: 'qa', name: 'Quality Assurance', icon: Users },
  ];

  return (
    <Select defaultValue="super_admin">
      <SelectTrigger className="w-full bg-white/10 border-white/20 focus:ring-primary-gold">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Switch role</SelectLabel>
          {roles.map((role) => (
            <SelectItem key={role.id} value={role.id} className="cursor-pointer">
              <div className="flex items-center">
                <role.icon className="mr-2 h-4 w-4" />
                <span>{role.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
