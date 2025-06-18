
// Testing utilities for admin panel functionality

export const testAdminFeatures = () => {
  const results: { feature: string; status: 'pass' | 'fail' | 'warning'; message: string }[] = [];

  // Test authentication
  try {
    const currentUser = localStorage.getItem('visiondrillCurrentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      if (user.role === 'admin' || user.role === 'subadmin') {
        results.push({ feature: 'Authentication', status: 'pass', message: 'Admin user logged in successfully' });
      } else {
        results.push({ feature: 'Authentication', status: 'fail', message: 'User does not have admin privileges' });
      }
    } else {
      results.push({ feature: 'Authentication', status: 'fail', message: 'No user logged in' });
    }
  } catch (error) {
    results.push({ feature: 'Authentication', status: 'fail', message: 'Error checking authentication' });
  }

  // Test localStorage functionality
  try {
    const testKey = 'visiondrillTest';
    const testValue = 'testData';
    localStorage.setItem(testKey, testValue);
    const retrieved = localStorage.getItem(testKey);
    if (retrieved === testValue) {
      results.push({ feature: 'Local Storage', status: 'pass', message: 'Local storage working correctly' });
      localStorage.removeItem(testKey);
    } else {
      results.push({ feature: 'Local Storage', status: 'fail', message: 'Local storage not working correctly' });
    }
  } catch (error) {
    results.push({ feature: 'Local Storage', status: 'fail', message: 'Local storage access denied' });
  }

  // Test real-time sync
  try {
    const lastUpdate = localStorage.getItem('visiondrillLastAdminUpdate');
    if (lastUpdate) {
      results.push({ feature: 'Real-time Sync', status: 'pass', message: 'Sync system initialized' });
    } else {
      results.push({ feature: 'Real-time Sync', status: 'warning', message: 'No sync data found (expected for first run)' });
    }
  } catch (error) {
    results.push({ feature: 'Real-time Sync', status: 'fail', message: 'Error checking sync system' });
  }

  // Test analytics
  try {
    const analytics = localStorage.getItem('visiondrillAnalytics');
    if (analytics) {
      const events = JSON.parse(analytics);
      if (Array.isArray(events)) {
        results.push({ feature: 'Analytics', status: 'pass', message: `Analytics tracking ${events.length} events` });
      } else {
        results.push({ feature: 'Analytics', status: 'warning', message: 'Analytics data format unexpected' });
      }
    } else {
      results.push({ feature: 'Analytics', status: 'warning', message: 'No analytics data found (expected for first run)' });
    }
  } catch (error) {
    results.push({ feature: 'Analytics', status: 'fail', message: 'Error checking analytics system' });
  }

  return results;
};

export const generateAdminReport = () => {
  const testResults = testAdminFeatures();
  const analytics = JSON.parse(localStorage.getItem('visiondrillAnalytics') || '[]');
  const syncEvents = JSON.parse(localStorage.getItem('visiondrillSyncEvent') || 'null');
  
  const report = {
    timestamp: new Date().toISOString(),
    testResults,
    analytics: {
      totalEvents: analytics.length,
      recentEvents: analytics.slice(-10),
    },
    sync: {
      lastEvent: syncEvents,
      lastUpdate: localStorage.getItem('visiondrillLastAdminUpdate'),
    },
    userSession: {
      currentUser: JSON.parse(localStorage.getItem('visiondrillCurrentUser') || 'null'),
      sessionId: sessionStorage.getItem('visiondrillSessionId'),
    },
  };

  console.log('Admin System Report:', report);
  return report;
};

// Function to clear all admin data (useful for testing)
export const clearAdminData = () => {
  const keysToRemove = [
    'visiondrillAnalytics',
    'visiondrillLastAdminUpdate',
    'visiondrillSyncEvent',
    'visiondrillHomepageContent',
    'visiondrillSiteSettings',
  ];

  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
  });

  console.log('Admin data cleared');
};
