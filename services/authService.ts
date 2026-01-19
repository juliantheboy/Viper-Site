import { User, UserRole, LoginLog } from '../types';

const USERS_KEY = 'viper_users';
const CURRENT_USER_KEY = 'viper_current_user';

// Simple mock hash simulation (Not real security, just for demo effect)
const mockHash = async (text: string): Promise<string> => {
  const msgBuffer = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return btoa(String.fromCharCode.apply(null, hashArray));
};

export const authService = {
  async register(email: string, password: string): Promise<User> {
    const usersStr = localStorage.getItem(USERS_KEY);
    const users: User[] = usersStr ? JSON.parse(usersStr) : [];
    
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await mockHash(password);
    const newUser: User & { passwordHash: string } = {
      id: crypto.randomUUID(),
      email,
      passwordHash: hashedPassword,
      role: email.includes('admin') ? UserRole.OWNER : UserRole.USER, // Backdoor for demo
      balance: 0,
      inventory: [],
      loginLogs: [],
      createdAt: Date.now()
    };

    // Store secure part separate in real app, but here we bundle
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Auto login
    return this.login(email, password);
  },

  async login(email: string, password: string): Promise<User> {
    const usersStr = localStorage.getItem(USERS_KEY);
    const users: any[] = usersStr ? JSON.parse(usersStr) : [];
    
    const user = users.find(u => u.email === email);
    
    // Fake network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const hashedPassword = await mockHash(password);
    if (user.passwordHash !== hashedPassword) {
      // Logic for locking account could go here
      throw new Error('Invalid credentials');
    }

    // Log login
    const log: LoginLog = {
      timestamp: Date.now(),
      ip: '192.168.X.X (Simulated)'
    };
    user.loginLogs.unshift(log);
    
    // Update user in DB
    const updatedUsers = users.map(u => u.id === user.id ? user : u);
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    // Set session
    const safeUser: User = { ...user };
    delete (safeUser as any).passwordHash;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

    return safeUser;
  },

  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser(): User | null {
    const u = localStorage.getItem(CURRENT_USER_KEY);
    return u ? JSON.parse(u) : null;
  },

  updateUserInventory(userId: string, item: any) {
    const usersStr = localStorage.getItem(USERS_KEY);
    const users: any[] = usersStr ? JSON.parse(usersStr) : [];
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].inventory.push(item);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Update session if it matches
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        currentUser.inventory.push(item);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      }
    }
  }
};
