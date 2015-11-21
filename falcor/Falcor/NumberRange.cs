﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Falcor
{
    [JsonObject(MemberSerialization.OptIn)]
    public sealed class NumberRange : NumericKey, IEquatable<NumberRange>, IEnumerable<int>
    {
        public NumberRange(int from, int to, bool inclusive = true)
        {
            if (inclusive)
                Debug.Assert(to >= from, $"{nameof(to)} >= {nameof(from)}");
            else
                Debug.Assert(to > from, $"{nameof(to)} > {nameof(from)}");

            From = from;
            To = inclusive ? to : (to - 1);
        }

        public NumberRange(int value) : this(value, value)
        {
        }

        public override KeyType KeyType { get; } = KeyType.Range;

        [JsonProperty]
        public int From { get; }

        /// <summary>
        ///     To value of the range
        /// </summary>
        [JsonProperty]
        public int To { get; }

        [DebuggerStepThrough]
        public IEnumerator<int> GetEnumerator() => AsEnumerable().GetEnumerator();

        [DebuggerStepThrough]
        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public bool Equals(NumberRange other)
        {
            if (other == null) return false;
            return To == other.To && From == other.From;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj is NumberRange && Equals((NumberRange) obj);
        }

        private IEnumerable<int> AsEnumerable()
        {
            for (var i = From; i <= To; i++)
                yield return i;
        }

        public override NumberRange AsRange() => this;

        public override SortedSet<int> AsSortedNumberSet() => new SortedSet<int>(AsEnumerable());
        public override JToken ToJson() => JToken.FromObject(this);

        public static bool operator ==(NumberRange lhs, NumberRange rhs) => Util.IfBothNullOrEquals(lhs, rhs);

        public static bool operator !=(NumberRange lhs, NumberRange rhs) => !(lhs == rhs);

        public override int GetHashCode()
        {
            unchecked
            {
                var hashCode = (int) KeyType;
                hashCode = (hashCode*397) ^ From.GetHashCode();
                hashCode = (hashCode*397) ^ To.GetHashCode();
                return hashCode;
            }
        }

        public static implicit operator List<int>(NumberRange range) => range.ToList();
    }
}