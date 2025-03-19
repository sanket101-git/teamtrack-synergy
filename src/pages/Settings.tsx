
import React from 'react';
import { User, Bell, Globe, Shield, Key, Mail, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SettingsSection = ({ title, description, icon, children }: SettingsSectionProps) => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default function Settings() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <SettingsSection
          title="Profile Settings"
          description="Manage your personal information and preferences"
          icon={<User size={20} />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue="Alex"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue="Morgan"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue="alex@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Job Title</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue="Product Manager"
              />
            </div>
            
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </SettingsSection>
        
        <SettingsSection
          title="Notification Settings"
          description="Configure when and how you receive notifications"
          icon={<Bell size={20} />}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="text-sm font-medium">Email Notifications</h4>
                <p className="text-xs text-muted-foreground">Receive notifications via email</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-muted p-1 transition-colors duration-200 ease-in-out data-[state=checked]:bg-primary">
                <div className="h-4 w-4 rounded-full bg-white transition-transform duration-200 ease-in-out translate-x-4" />
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="text-sm font-medium">Task Assignment Notifications</h4>
                <p className="text-xs text-muted-foreground">Get notified when you're assigned a task</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-primary p-1 transition-colors duration-200 ease-in-out data-[state=checked]:bg-primary">
                <div className="h-4 w-4 rounded-full bg-white transition-transform duration-200 ease-in-out translate-x-4" />
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="text-sm font-medium">Task Due Date Reminders</h4>
                <p className="text-xs text-muted-foreground">Get reminded about upcoming due dates</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-primary p-1 transition-colors duration-200 ease-in-out data-[state=checked]:bg-primary">
                <div className="h-4 w-4 rounded-full bg-white transition-transform duration-200 ease-in-out translate-x-4" />
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="text-sm font-medium">Team Updates</h4>
                <p className="text-xs text-muted-foreground">Get notified about team member changes</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-muted p-1 transition-colors duration-200 ease-in-out data-[state=checked]:bg-primary">
                <div className="h-4 w-4 rounded-full bg-white transition-transform duration-200 ease-in-out" />
              </div>
            </div>
          </div>
        </SettingsSection>
        
        <SettingsSection
          title="Security Settings"
          description="Manage your account security and authentication preferences"
          icon={<Shield size={20} />}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <input
                type="password"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter current password"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-3">Two-Factor Authentication</h4>
              <button className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors">
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}
