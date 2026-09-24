require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Task = require('../models/Task');
const Workflow = require('../models/Workflow');
const AutomationLog = require('../models/AutomationLog');
const Notification = require('../models/Notification');
const DeduplicationRecord = require('../models/DeduplicationRecord');
const {
  TASK_STATUS,
  TASK_PRIORITY,
  TRIGGER_TYPE,
  CONDITION_OPERATOR,
  ACTION_TYPE,
  NOTIFICATION_TYPE,
  NOTIFICATION_PRIORITY,
  EXECUTION_STATUS,
} = require('../config/constants');

const seedData = async () => {
  console.log('[Seeder] Starting FlowDesk sample data seeding...');
  await connectDB();

  try {
    // 1. Clear existing seed collections
    await Promise.all([
      User.deleteMany({}),
      Task.deleteMany({}),
      Workflow.deleteMany({}),
      AutomationLog.deleteMany({}),
      Notification.deleteMany({}),
      DeduplicationRecord.deleteMany({})
    ]);

    console.log('[Seeder] Cleared previous database collections.');

    // 2. Create Demo User
    const demoUser = await User.create({
      name: 'Alex Rivera',
      email: 'alex.developer@flowdesk.io',
      password: 'FlowDeskPass2026!',
      timezone: 'America/New_York',
      preferences: {
        theme: 'dark',
        inAppNotifications: true,
        upcomingDeadlineThresholdHours: 24
      }
    });

    console.log(`[Seeder] Created Demo User: ${demoUser.email} (Password: FlowDeskPass2026!)`);

    // 3. Create Sample Tasks
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const inThreeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const task1 = await Task.create({
      user: demoUser._id,
      title: 'Q3 Cloud Infrastructure Architecture Review',
      description: 'Review Kubernetes cluster autoscaling policies and migrate Redis cluster to distributed cache.',
      status: TASK_STATUS.IN_PROGRESS,
      priority: TASK_PRIORITY.URGENT,
      category: 'Engineering',
      tags: ['infrastructure', 'kubernetes', 'architecture'],
      dueDate: tomorrow,
      dueTime: '16:00',
      subtasks: [
        { title: 'Audit current pod resource utilization', isCompleted: true, completedAt: twoDaysAgo },
        { title: 'Draft Terraform modular configuration', isCompleted: true, completedAt: yesterday },
        { title: 'Present rollout plan to engineering leads', isCompleted: false },
      ]
    });

    const task2 = await Task.create({
      user: demoUser._id,
      title: 'Prepare Distributed Database Benchmark Report',
      description: 'Run latency and throughput benchmarks comparing MongoDB Atlas replica sets against read-heavy clusters.',
      status: TASK_STATUS.TODO,
      priority: TASK_PRIORITY.HIGH,
      category: 'Research',
      tags: ['database', 'benchmarks', 'performance'],
      dueDate: inThreeDays,
      dueTime: '14:00',
      subtasks: [
        { title: 'Configure benchmarking harness script', isCompleted: false },
        { title: 'Capture 99th percentile p99 latency metrics', isCompleted: false }
      ]
    });

    const task3 = await Task.create({
      user: demoUser._id,
      title: 'Finalize Workflow Automation Engine Documentation',
      description: 'Complete comprehensive developer documentation and architecture diagrams for the personal automation platform.',
      status: TASK_STATUS.COMPLETED,
      priority: TASK_PRIORITY.MEDIUM,
      category: 'Documentation',
      tags: ['docs', 'saas', 'automation'],
      dueDate: yesterday,
      dueTime: '17:00',
      completedAt: yesterday,
      subtasks: [
        { title: 'Document Trigger-Condition-Action schemas', isCompleted: true, completedAt: yesterday },
        { title: 'Include Mermaid sequence flow charts', isCompleted: true, completedAt: yesterday }
      ]
    });

    const task4 = await Task.create({
      user: demoUser._id,
      title: 'Weekly Sprint Backlog Grooming',
      description: 'Review user-reported feedback tickets and groom task priorities for the upcoming cycle.',
      status: TASK_STATUS.TODO,
      priority: TASK_PRIORITY.LOW,
      category: 'Product',
      tags: ['sprint', 'agile'],
      dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      dueTime: '10:00',
      subtasks: []
    });

    console.log('[Seeder] Created 4 sample tasks with subtasks and categories.');

    // 4. Create Active Workflows
    const wf1 = await Workflow.create({
      user: demoUser._id,
      name: 'Urgent Deadline Auto-Escalation',
      description: 'Increases priority to Urgent and creates an in-app reminder whenever an incomplete task enters the 24h deadline window.',
      isActive: true,
      trigger: {
        type: TRIGGER_TYPE.DEADLINE_APPROACHING,
        config: { advanceNoticeHours: 24 }
      },
      conditions: [
        {
          field: 'status',
          operator: CONDITION_OPERATOR.NOT_EQUALS,
          value: TASK_STATUS.COMPLETED,
          logicalOperator: 'AND'
        }
      ],
      actions: [
        {
          type: ACTION_TYPE.CHANGE_PRIORITY,
          payload: { priority: TASK_PRIORITY.URGENT },
          order: 0
        },
        {
          type: ACTION_TYPE.CREATE_REMINDER,
          payload: { title: 'Approaching Deadline' },
          order: 1
        }
      ],
      executionCount: 14,
      lastExecutedAt: new Date(now.getTime() - 45 * 60 * 1000)
    });

    const wf2 = await Workflow.create({
      user: demoUser._id,
      name: 'Auto Follow-up On Completion',
      description: 'Automatically creates a follow-up review task 2 days after completing any major task.',
      isActive: true,
      trigger: {
        type: TRIGGER_TYPE.TASK_COMPLETED,
        config: {}
      },
      conditions: [],
      actions: [
        {
          type: ACTION_TYPE.CREATE_FOLLOW_UP_TASK,
          payload: { title: 'Review & Verify Outcome', offsetDays: 2 },
          order: 0
        },
        {
          type: ACTION_TYPE.CREATE_NOTIFICATION,
          payload: { message: 'Follow-up task created automatically.' },
          order: 1
        }
      ],
      executionCount: 8,
      lastExecutedAt: yesterday
    });

    const wf3 = await Workflow.create({
      user: demoUser._id,
      name: 'High Priority Tag & Focus Alert',
      description: 'Tags high-priority tasks with "high-focus" and dispatches a focus notification.',
      isActive: true,
      trigger: {
        type: TRIGGER_TYPE.TASK_CREATED,
        config: {}
      },
      conditions: [
        {
          field: 'priority',
          operator: CONDITION_OPERATOR.EQUALS,
          value: TASK_PRIORITY.HIGH,
          logicalOperator: 'AND'
        }
      ],
      actions: [
        {
          type: ACTION_TYPE.ADD_TAG,
          payload: { tag: 'high-focus' },
          order: 0
        },
        {
          type: ACTION_TYPE.CREATE_NOTIFICATION,
          payload: { message: 'High priority task detected. Focus block recommended.' },
          order: 1
        }
      ],
      executionCount: 6,
      lastExecutedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000)
    });

    console.log('[Seeder] Created 3 active workflows.');

    // 5. Create Sample Notifications
    await Notification.create([
      {
        user: demoUser._id,
        title: 'Deadline Approaching: Q3 Architecture Review',
        message: 'Task is due in under 24 hours. Priority has been escalated to URGENT.',
        type: NOTIFICATION_TYPE.TASK_DUE,
        priority: NOTIFICATION_PRIORITY.URGENT,
        relatedTaskId: task1._id,
        relatedWorkflowId: wf1._id,
        isRead: false
      },
      {
        user: demoUser._id,
        title: 'Automated Follow-up Created',
        message: 'Created follow-up task "Review & Verify Outcome" following completion of Documentation task.',
        type: NOTIFICATION_TYPE.AUTOMATION_ACTION,
        priority: NOTIFICATION_PRIORITY.INFO,
        relatedTaskId: task3._id,
        relatedWorkflowId: wf2._id,
        isRead: false
      },
      {
        user: demoUser._id,
        title: 'High Priority Task Tagged',
        message: 'Task "Prepare Distributed Database Benchmark Report" tagged as high-focus.',
        type: NOTIFICATION_TYPE.AUTOMATION_ACTION,
        priority: NOTIFICATION_PRIORITY.INFO,
        relatedTaskId: task2._id,
        relatedWorkflowId: wf3._id,
        isRead: true
      }
    ]);

    // 6. Create Sample Automation Logs
    await AutomationLog.create([
      {
        user: demoUser._id,
        workflowId: wf1._id,
        workflowName: wf1.name,
        taskId: task1._id,
        taskTitle: task1.title,
        triggerType: TRIGGER_TYPE.DEADLINE_APPROACHING,
        status: EXECUTION_STATUS.SUCCESS,
        evaluatedConditions: [
          {
            field: 'status',
            operator: CONDITION_OPERATOR.NOT_EQUALS,
            expectedValue: TASK_STATUS.COMPLETED,
            actualValue: TASK_STATUS.IN_PROGRESS,
            passed: true
          }
        ],
        actionsExecuted: [
          {
            type: ACTION_TYPE.CHANGE_PRIORITY,
            payload: { priority: TASK_PRIORITY.URGENT },
            status: 'SUCCESS',
            resultMessage: 'Changed priority from HIGH to URGENT'
          },
          {
            type: ACTION_TYPE.CREATE_REMINDER,
            payload: { title: 'Approaching Deadline' },
            status: 'SUCCESS',
            resultMessage: 'Dispatched urgent reminder'
          }
        ],
        executionDurationMs: 14
      },
      {
        user: demoUser._id,
        workflowId: wf2._id,
        workflowName: wf2.name,
        taskId: task3._id,
        taskTitle: task3.title,
        triggerType: TRIGGER_TYPE.TASK_COMPLETED,
        status: EXECUTION_STATUS.SUCCESS,
        evaluatedConditions: [],
        actionsExecuted: [
          {
            type: ACTION_TYPE.CREATE_FOLLOW_UP_TASK,
            payload: { title: 'Review & Verify Outcome', offsetDays: 2 },
            status: 'SUCCESS',
            resultMessage: 'Created follow-up task "Review & Verify Outcome"'
          }
        ],
        executionDurationMs: 22
      },
      {
        user: demoUser._id,
        workflowId: wf3._id,
        workflowName: wf3.name,
        taskId: task2._id,
        taskTitle: task2.title,
        triggerType: TRIGGER_TYPE.TASK_CREATED,
        status: EXECUTION_STATUS.SUCCESS,
        evaluatedConditions: [
          {
            field: 'priority',
            operator: CONDITION_OPERATOR.EQUALS,
            expectedValue: TASK_PRIORITY.HIGH,
            actualValue: TASK_PRIORITY.HIGH,
            passed: true
          }
        ],
        actionsExecuted: [
          {
            type: ACTION_TYPE.ADD_TAG,
            payload: { tag: 'high-focus' },
            status: 'SUCCESS',
            resultMessage: "Added tag 'high-focus' to task"
          }
        ],
        executionDurationMs: 11
      }
    ]);

    console.log('[Seeder] Database seeding completed successfully! ✨');
    process.exit(0);
  } catch (error) {
    console.error('[Seeder Error]', error);
    process.exit(1);
  }
};

seedData();
