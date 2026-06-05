import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [sessionReady, setSessionReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase puts the token in the URL hash — this picks it up automatically
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSessionReady(true);
      }
    });
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage('Passwords do not match.');
      setStatus('error');
      return;
    }
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
      setStatus('error');
    } else {
      setStatus('success');
      setTimeout(() => navigate('/my-account'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-spa-cream flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-elegant p-8 lg:p-10">

          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check size={28} className="text-green-600" />
              </div>
              <h2 className="font-serif text-2xl text-spa-charcoal mb-2">Password Updated!</h2>
              <p className="text-spa-gray text-sm">Redirecting you to sign in...</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-full bg-spa-lavender flex items-center justify-center mx-auto mb-4">
                  <Lock size={22} className="text-spa-purple" />
                </div>
                <h1 className="font-serif text-2xl text-spa-charcoal">Set New Password</h1>
                <p className="text-spa-gray text-sm mt-2">
                  {sessionReady ? 'Enter your new password below.' : 'Loading your reset link...'}
                </p>
              </div>

              {!sessionReady ? (
                <div className="text-center py-4">
                  <div className="w-8 h-8 border-2 border-spa-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-spa-gray text-xs mt-3">Verifying your reset link...</p>
                </div>
              ) : (
                <form onSubmit={handleReset} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">New Password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-gray" />
                      <input
                        type="password"
                        placeholder="Min. 8 characters"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spa-charcoal mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-gray" />
                      <input
                        type="password"
                        placeholder="Repeat your password"
                        required
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-spa-lavender rounded-xl text-spa-charcoal placeholder:text-spa-gray focus:outline-none focus:ring-2 focus:ring-spa-purple/30"
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-xl px-4 py-3">
                      <AlertCircle size={16} />
                      <span className="text-sm">{message}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-50 mt-2">
                    {status === 'loading' ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
