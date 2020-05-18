"use strict";

/**
 * Double ended queue with all operations running in constant time.
 */
class Deque
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        this.h = null;
        this.t = null;
    }

    /**
     * Adds an item at the start of the queue.
     *
     * @param {Object} item the item to add.
     */
    addFirst(item)
    {
        if(this.h === null)
        {
            const r = new Record(null, item, null);
            this.h = r;
            this.t = r;
        }
        else if(this.h === this.t)
        {
            const r = new Record(null, item, this.t);
            this.t = this.h;
            this.t.h = r;
            this.h = r;
        }
        else
        {
            const r = new Record(null, item, this.h);
            this.h.h = r;
            this.h = r;
        }
    }

    /**
     * Adds an item at the end of the queue.
     *
     * @param {Object} item the item to add.
     */
    addLast(item)
    {
        if(this.h === null)
        {
            const r = new Record(null, item, null);
            this.h = r;
            this.t = r;
        }
        else if(this.h === this.t)
        {
            const r = new Record(this.t, item, null);
            this.h = this.t;
            this.h.t = r;
            this.t = r;
        }
        else
        {
            const r = new Record(this.t, item, null);
            this.t.t = r;
            this.t = r;
        }
    }

    /**
     * Removes all items in specified queue and adds the items (first to last) at
     * the end of this queue. Runs in constant time.
     *
     * @param {Deque} queue the queue to append.
     */
    appendAll(queue)
    {
        if(queue.isEmpty())
        {
            return;
        }
        if(this.h === null)
        {
            this.h = queue.h;
            this.t = queue.t;
        }
        else
        {
            this.t.t = queue.h;
            queue.h.h = this.t;
            this.t = queue.t;
        }
        queue.removeAll();
    }

    /**
     * Removes all items in specified queue and adds the items (last to first) at
     * the start of this queue. Runs in constant time.
     *
     * @param {Deque} queue the queue to prepend.
     */
    prependAll(queue)
    {
        if(queue.isEmpty())
        {
            return;
        }
        if(this.h === null)
        {
            this.h = queue.h;
            this.t = queue.t;
        }
        else
        {
            this.h.h = queue.t;
            queue.t.t = this.h;
            this.h = queue.h;
        }
        queue.removeAll();
    }

    /**
     * Gets the head record.
     *
     * @return {Record} the head record.
     */
    peekFirst()
    {
        if(this.h === null)
        {
            throw new Error("failed to peek head of empty deque");
        }
        return this.h.d;
    }

    /**
     * Gets the tail record.
     *
     * @return {Record} the tail record.
     */
    peekLast()
    {
        if(this.t === null)
        {
            throw new Error("failed to peek tail of empty deque");
        }
        return this.t.d;
    }

    /**
     * Determines if this queue is empty.
     *
     * @return {Boolean} indicates if this queue is empty.
     */
    isEmpty()
    {
        return this.h === null;
    }

    /**
     * Determines if this queue contains exactly one element.
     *
     * @return {Boolean} indicates if this queue contains exactly one element.
     */
    isSingleton()
    {
        return this.h !== null && this.h === this.t;
    }

    /**
     * Removes all elements from the queue.
     */
    removeAll()
    {
        this.h = null;
        this.t = null;
    }

    /**
     * Removes the item at the start of the queue.
     *
     * @return {Object} the item at the start of the queue.
     */
    removeFirst()
    {
        if(this.h === null)
        {
            throw new Error("failed to remove head of empty deque");
        }
        const r = this.h;
        if(this.h === this.t)
        {
            this.h = null;
            this.t = null;
        }
        else
        {
            this.h = r.t;
        }
        return r.d;
    }

    /**
     * Removes the item at the end of the queue.
     *
     * @return {Object} the item at the end of the queue.
     */
    removeLast()
    {
        if(this.t === null)
        {
            throw new Error("failed to remove tail of empty deque");
        }
        const r = this.t;
        if(this.h === this.t)
        {
            this.h = null;
            this.t = null;
        }
        else
        {
            this.t = r.h;
        }
        return r.d;
    }
}

/**
 * Double ended queue record.
 *
 * @private
 */
class Record
{
    /**
     * Creates a new instance of this class.
     *
     * @private
     * @param {Record} h the head record.
     * @param {Object} d the record data.
     * @param {Record} t the tail record.
     */
    constructor(h, d, t)
    {
        this.h = h;
        this.d = d;
        this.t = t;
    }
}

module.exports = Deque;