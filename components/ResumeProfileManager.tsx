'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FolderOpen, Plus, Trash2, X, FileText, Edit2, Check } from 'lucide-react';

export default function ResumeProfileManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const { savedProfiles, saveProfile, loadProfile, deleteProfile, renameProfile } = useResumeStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setEditingId(null);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, close]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSave = () => {
    const name = profileName.trim();
    if (!name) return;
    saveProfile(name);
    setProfileName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
  };

  const handleLoad = (id: string) => {
    loadProfile(id);
    close();
  };

  const handleStartRename = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  const handleFinishRename = () => {
    if (editingId && editingName.trim()) {
      renameProfile(editingId, editingName.trim());
    }
    setEditingId(null);
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleFinishRename();
    if (e.key === 'Escape') setEditingId(null);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const dialog = isOpen && mounted ? createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-background rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 rounded-t-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-primary-foreground">Resume Profiles</h2>
              <p className="text-[10px] text-primary-foreground/70">Save and switch between different resume versions</p>
            </div>
            <button
              onClick={close}
              className="rounded-full p-1.5 hover:bg-white/20 transition-colors"
              aria-label="Close profile manager"
            >
              <X className="h-5 w-5 text-primary-foreground" />
            </button>
          </div>
        </div>

        <div className="px-6 py-4 space-y-4">
          {/* Save Current Resume */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Save Current Resume</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Profile name (e.g. Software Engineer)"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                maxLength={50}
              />
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!profileName.trim() || savedProfiles.length >= 10}
                className="gap-1.5 h-9"
              >
                <Plus className="h-3.5 w-3.5" /> Save
              </Button>
            </div>
            {savedProfiles.length >= 10 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1.5">
                Maximum 10 profiles reached. Delete one to save a new profile.
              </p>
            )}
          </div>

          <Separator />

          {/* Saved Profiles List */}
          <div>
            <p className="text-sm font-medium mb-2">
              Saved Profiles ({savedProfiles.length}/10)
            </p>

            {savedProfiles.length === 0 ? (
              <Card className="p-6 text-center border-dashed">
                <FileText className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No saved profiles yet.</p>
                <p className="text-xs text-muted-foreground mt-1">Save your current resume to create your first profile.</p>
              </Card>
            ) : (
              <div className="space-y-2">
                {savedProfiles.map((profile) => (
                  <Card key={profile.id} className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {editingId === profile.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              onKeyDown={handleRenameKeyDown}
                              onBlur={handleFinishRename}
                              className="h-7 flex-1 rounded border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              maxLength={50}
                              autoFocus
                            />
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleFinishRename}>
                              <Check className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm font-medium truncate">{profile.name}</p>
                            <p className="text-[11px] text-muted-foreground">
                              {formatDate(profile.createdAt)}
                            </p>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {editingId !== profile.id && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleStartRename(profile.id, profile.name)}
                            title="Rename"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => deleteProfile(profile.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => handleLoad(profile.id)}
                        >
                          Load
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(true)} title="Resume Profiles">
        <FolderOpen className="h-4 w-4" />
      </Button>
      {dialog}
    </>
  );
}
